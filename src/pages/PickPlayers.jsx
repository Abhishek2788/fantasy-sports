import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPlayers } from "../api/api";
import { PlayerCard } from "../components/PlayerCard"; 
import Modal from "../components/Modal";
import {
  TOTAL_PLAYERS,
  TOTAL_CREDITS,
  ROLE_LIMITS,
  isSelectionValid,
  getRoleCounts,
  countFromEachTeam,
  totalCreditsUsed,
  canonicalRole,
  MAX_FROM_ONE_TEAM,
} from "../utils/validators";
import { v4 as uuidv4 } from "uuid";
import { useTeamContext } from "../context/TeamContext.jsx";
import { useMatchContext } from "../context/MatchContext.jsx";
import PickCaptain from "./PickCaptain.jsx";
import { LeftArrowIcon } from "../components/icons/LeftArrowIcon.jsx";
import { TeamCreationSuccessPopup } from "../components/TeamCreationSuccessPopup.jsx";
import { TeamPreviewPopup } from "../components/TeamPreviewPopup.jsx";

const ROLE_ORDER = ["WK", "BAT", "AR", "BOWL"];
const ROLE_CODE_TO_KEY = {
  WK: "wicketkeeper",
  BAT: "batsman",
  AR: "allrounder",
  BOWL: "bowler",
};

function normalizeRole(roleRaw) {
  if (!roleRaw) return "BAT";
  const r = String(roleRaw).toLowerCase();
  if (r.includes("wicket") || r.includes("keeper") || r === "wk") return "WK";
  if (r.includes("bat") && !r.includes("all")) return "BAT";
  if (r.includes("all") || r.includes("all-rounder")) return "AR";
  if (r.includes("bowl") || r === "bowler") return "BOWL";
  return "BAT";
}

export default function PickPlayers() {
  const { matchId } = useParams();
  const { match: currentMatch } = useMatchContext();
  const navigate = useNavigate();

  const { addTeam } = useTeamContext();

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [activeRole, setActiveRole] = useState("WK");
  const [showPreview, setShowPreview] = useState(false);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const [editingTeam, setEditingTeam] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");

  // fetch players (original logic)
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPlayers(matchId)
      .then((data) => {
        if (!mounted) return;
        const arr = Array.isArray(data) ? data : [];

        const normalized = (arr || []).map((p, idx) => ({
          id: String(p.id ?? p.player_id ?? idx),
          playerId: p.player_id ?? p.id ?? String(idx),
          name: p.name ?? p.short_name ?? `Player ${idx + 1}`,
          team: p.team_name ?? p.team_short_name ?? "Team",
          teamShort: p.team_short_name ?? undefined,
          teamLogo: p.team_logo ?? undefined,
          role: normalizeRole(p.role ?? ""),
          credits: p.event_player_credit ?? 9,
          points: p.event_total_points ?? 0,
          is_playing: p.is_playing ?? true,
        }));

        setPlayers(normalized);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [matchId]);

  // header teams derive (keeps your previous logic)
  const headerTeams = useMemo(() => {
    if (currentMatch) {
      return [
        {
          name: currentMatch.t1_name,
          short: currentMatch.t1_short_name,
          logo: currentMatch.t1_image,
          id: currentMatch.team_a_id,
        },
        {
          name: currentMatch.t2_name,
          short: currentMatch.t2_short_name,
          logo: currentMatch.t2_image,
          id: currentMatch.team_b_id,
        },
      ];
    }
    const uniq = [];
    for (const p of players) {
      if (!uniq.find((t) => t.name === p.team))
        uniq.push({ name: p.team, logo: p.teamLogo, short: p.teamShort });
      if (uniq.length === 2) break;
    }
    while (uniq.length < 2)
      uniq.push({ name: "Team", logo: undefined, short: "Team" });
    return uniq;
  }, [currentMatch, players]);

  // players grouped by role
  const playersByRole = useMemo(() => {
    const groups = { WK: [], BAT: [], AR: [], BOWL: [] };
    for (const p of players) {
      if (!groups[p.role]) groups[p.role] = [];
      groups[p.role].push(p);
    }
    Object.keys(groups).forEach((k) =>
      groups[k].sort((a, b) =>
        b.credits !== a.credits
          ? b.credits - a.credits
          : a.name.localeCompare(b.name)
      )
    );
    return groups;
  }, [players]);

  const creditsUsed = useMemo(() => totalCreditsUsed(selected), [selected]);
  const creditsLeft = Math.max(0, TOTAL_CREDITS - creditsUsed);
  const byTeamCounts = useMemo(() => countFromEachTeam(selected), [selected]);

  function openModal(title, message, onConfirm = null) {
    setModal({ open: true, title, message, onConfirm });
  }
  function closeModal() {
    setModal({ open: false, title: "", message: "", onConfirm: null });
  }

  function togglePlayer(player) {
    const exists = selected.find((s) => s.id === player.id);
    if (exists) {
      setSelected((prev) => prev.filter((s) => s.id !== player.id));
      return;
    }

    if (selected.length >= TOTAL_PLAYERS) {
      openModal("Selection limit", `Only ${TOTAL_PLAYERS} players allowed`);
      return;
    }

    const roleCounts = getRoleCounts(selected);
    const canonical = canonicalRole(player.role);
    const currentRoleCount = roleCounts[canonical] ?? 0;
    const limitForRole =
      (ROLE_LIMITS &&
        ROLE_LIMITS[
          ROLE_CODE_TO_KEY[player.role]
            ? ROLE_CODE_TO_KEY[player.role]
            : canonical
        ] &&
        ROLE_LIMITS[
          ROLE_CODE_TO_KEY[player.role]
            ? ROLE_CODE_TO_KEY[player.role]
            : canonical
        ].max) ??
      (ROLE_LIMITS && ROLE_LIMITS.DEFAULT && ROLE_LIMITS.DEFAULT.max) ??
      7;

    if (currentRoleCount + 1 > limitForRole) {
      openModal(
        "Role limit",
        `Cannot add more ${
          canonical === "wicketkeeper" ? "Wicket-Keepers" : canonical
        }. Max allowed: ${limitForRole}`
      );
      return;
    }

    const currentCreditsUsed = totalCreditsUsed(selected);
    if (currentCreditsUsed + player.credits > TOTAL_CREDITS) {
      openModal("Credit limit", "Credits exceed limit");
      return;
    }

    const teamCounts = countFromEachTeam([...selected, player]);
    if (Math.max(...Object.values(teamCounts)) > MAX_FROM_ONE_TEAM) {
      openModal(
        "Team limit",
        `Max ${MAX_FROM_ONE_TEAM} players allowed from a single team`
      );
      return;
    }

    setSelected((prev) => [...prev, player]);
  }

  function saveTeam() {
    if (selected.length !== TOTAL_PLAYERS) {
      openModal("Incomplete team", `Select ${TOTAL_PLAYERS} players`);
      return;
    }
    const { valid, reason } = isSelectionValid(selected);
    if (!valid) {
      openModal("Invalid selection", reason || "Selection invalid");
      return;
    }
    const newTeam = {
      id: uuidv4(),
      name: `Team ${new Date().toLocaleTimeString()}`,
      players: selected,
      createdAt: new Date().toISOString(),
      captainId: null,
      viceCaptainId: null,
      creditsUsed,
    };
    setEditingTeam(newTeam);
  }

  function handleFinalSave(teamAfterCaptainPick) {
    if (teamAfterCaptainPick) {
      addTeam(matchId, teamAfterCaptainPick);
      setEditingTeam(null);
      setSavedMessage("Team saved successfully.");

      setTimeout(() => {
        setSavedMessage("");
        navigate("/");
      }, 1500);
    }
  }

  function handleCancelCaptainPick() {
    setEditingTeam(null);
  }

  if (loading)
    return (
      <div className="py-12 text-center text-gray-500">Loading players...</div>
    );

  return (
    <div className="flex justify-center sm:mt-4 pb-4">
      {savedMessage && (
        <TeamCreationSuccessPopup
          savedMessage={savedMessage}
          onClose={() => setSavedMessage("")}
        />
      )}

      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleCancelCaptainPick}
          />
          <div className="relative h-[90vh] w-full max-w-2xl bg-white rounded-t-lg sm:rounded-lg shadow-xl sm:p-4 z-50">
            <PickCaptain
              match={currentMatch}
              teamProp={editingTeam}
              onFinalSave={(teamWithCaptains) =>
                handleFinalSave(teamWithCaptains)
              }
              onCancel={handleCancelCaptainPick}
            />
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl sm:px-4">
        <div className="sm:rounded-xl overflow-hidden shadow-xl bg-white sm:border border-gray-100">
          {/* Header with linear styling (from the second snippet) */}
          <div className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-500 text-white px-4 py-8 sm:px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="sm:p-2 rounded-lg hover:bg-white/20 transition-colors hover:cursor-pointer"
                >
                  <LeftArrowIcon />
                </button>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold">
                    Select Your Players
                  </h1>
                  <p className="text-blue-100 text-sm mt-1 sm:mt-2">
                    Build your perfect team
                  </p>
                </div>
              </div>
              <div className="text-xs text-blue-100 font-medium">
                Pick Captain Later
              </div>
            </div>

            <div className="flex  items-center justify-between gap-6 mb-8">
              <div className="flex gap-6">
                {headerTeams.map((t, i) => {
                  const count = byTeamCounts[t.name] || 0;
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-14 sm:w-16 h-14 sm:h-16 bg-white rounded-full flex items-center justify-center border-3 border-blue-200 relative shadow-lg">
                        {t?.logo ? (
                          <img
                            src={t.logo || "/placeholder.svg"}
                            alt={t.name}
                            className="w-full h-full object-cover rounded-full"
                          />
                        ) : (
                          <span className="font-bold text-blue-600 text-sm">
                            {t.short || t.name}
                          </span>
                        )}

                        <div className="absolute -top-2 -right-2 bg-linear-to-r from-green-400 to-emerald-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                          {count}
                        </div>
                      </div>
                      <span className="text-xs text-blue-100 mt-2 font-semibold">
                        {t.short || t.name}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="">
                <div className="text-xs sm:text-sm text-blue-100 mb-3 font-semibold">
                  Max {MAX_FROM_ONE_TEAM ?? 7} players from a team
                </div>
                <div className="flex gap-3 sm:gap-8">
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:px-4 sm:py-3 border border-white/20">
                    <div className="flex items-baseline">
                      <span className="text-2xl sm:text-4xl font-bold">
                        {selected.length}
                      </span>
                      <span className="text-sm sm:text-lg text-blue-100">
                        /{TOTAL_PLAYERS}
                      </span>
                    </div>
                    <span className="text-xs text-blue-100 sm:mt-1 font-medium">
                      Players
                    </span>
                  </div>
                  <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:px-4 sm:py-3 border border-white/20">
                    <div className="text-2xl sm:text-3xl font-bold">
                      {creditsLeft}
                    </div>
                    <span className="text-xs text-blue-100 sm:mt-1 font-medium">
                      Credits Left
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Roles tabs (styled) */}
          <div className="bg-white">
            <div className="flex gap-2 overflow-auto p-4 border-b border-gray-100">
              {ROLE_ORDER.map((r) => {
                const selCnt = selected.filter((s) => s.role === r).length;
                return (
                  <button
                    key={r}
                    onClick={() => setActiveRole(r)}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-bold transition-all whitespace-nowrap hover:cursor-pointer ${
                      activeRole === r
                        ? "bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{r}</span>
                    <span className="text-sm opacity-75">({selCnt})</span>
                  </button>
                );
              })}
            </div>

            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-gray-900 text-lg text-center">
                Select{" "}
                {(ROLE_LIMITS &&
                  ROLE_LIMITS[ROLE_CODE_TO_KEY[activeRole]] &&
                  ROLE_LIMITS[ROLE_CODE_TO_KEY[activeRole]].min) ??
                  0}{" "}
                -{" "}
                {(ROLE_LIMITS &&
                  ROLE_LIMITS[ROLE_CODE_TO_KEY[activeRole]] &&
                  ROLE_LIMITS[ROLE_CODE_TO_KEY[activeRole]].max) ??
                  0}{" "}
                {activeRole === "BAT"
                  ? "Batsmen"
                  : activeRole === "BOWL"
                  ? "Bowlers"
                  : activeRole === "AR"
                  ? "All Rounders"
                  : "Wicket Keepers"}
              </h2>
            </div>

            <div className="px-6 pr-16 py-3 bg-white flex justify-between text-xs font-semibold text-gray-600 border-b border-gray-100">
              <div>
                {activeRole === "BAT"
                  ? "Batsmen"
                  : activeRole === "BOWL"
                  ? "Bowlers"
                  : activeRole === "AR"
                  ? "All Rounders"
                  : "Wicket Keepers"}
              </div>
              <div className="flex gap-8">
                <div>Points</div>
                <div>Credits</div>
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {(playersByRole[activeRole] || []).length === 0 && (
                <div className="py-8 text-center text-sm text-gray-400">
                  No players available
                </div>
              )}
               {(playersByRole[activeRole] || []).map((p) => (
                <PlayerCard
                  key={p.id}
                  player={p}
                  selected={!!selected.find((s) => s.id === p.id)}
                  onToggle={() => togglePlayer(p)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* fixed bottom bar styled like second snippet */}
        <div className="fixed left-0 right-0 bottom-0 sm:relative sm:mt-6 flex justify-center pointer-events-none z-40">
          <div className="w-full max-w-5xl bg-white pointer-events-auto sm:rounded-xl shadow-2xl sm:border px-4 py-4 flex gap-3 sm:gap-4">
            <button
              onClick={() => setShowPreview(true)}
              className="flex-1 px-4 py-3 rounded-lg border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-50 transition-all hover:cursor-pointer"
            >
              Preview
            </button>
            <button
              onClick={saveTeam}
              className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 hover:cursor-pointer"
            >
              Continue
            </button>
          </div>
        </div>

        {showPreview && (
          <TeamPreviewPopup
            selected={selected}
            onClose={() => setShowPreview(false)}
          />
        )}

        {modal.open && (
          <Modal
            open={modal.open}
            title={modal.title}
            message={modal.message}
            onClose={closeModal}
            onConfirm={modal.onConfirm}
          />
        )}
      </div>
    </div>
  );
}
