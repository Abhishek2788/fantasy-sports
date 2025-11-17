import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTeamContext } from "../context/TeamContext";
import Modal from "../components/Modal";
import { CrossIcon } from "../components/icons/CrossIcon";
import { getTimeLeft } from "../utils/commonUtils";

export default function PickCaptain({
  match,
  teamProp = null,
  onFinalSave = null,
  onCancel = null,
}) {
  const { matchId } = useParams();
  const { teamsByMatch, updateTeam } = useTeamContext();
  const location = useLocation();
  const navigate = useNavigate();
  const teamId = location.state?.teamId || null;
  const [team, setTeam] = useState(null);
  const [cap, setCap] = useState(null);
  const [vc, setVc] = useState(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: null,
  });
  const timeleft = getTimeLeft(match?.match_date);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (teamProp) {
      setTeam(teamProp);
      setCap(teamProp.captainId ?? null);
      setVc(teamProp.viceCaptainId ?? null);
      return;
    }
    const teams = teamsByMatch[matchId] || [];
    const found = teams.find((t) => t.id === teamId) || teams[0];
    if (found) {
      setTeam(found);
      setCap(found.captainId);
      setVc(found.viceCaptainId);
    }
  }, [teamsByMatch, matchId, teamId, teamProp]);

  function openModal(title, message, onConfirm = null) {
    setModal({ open: true, title, message, onConfirm });
  }
  function closeModal() {
    setModal({ open: false, title: "", message: "", onConfirm: null });
  }

  function save() {
    if (!cap || !vc) {
      openModal(
        "Selection required",
        "Please select both Captain and Vice-Captain"
      );
      return;
    }
    if (cap === vc) {
      openModal(
        "Invalid selection",
        "Captain and Vice-Captain must be different"
      );
      return;
    }

    const updated = { ...team, captainId: cap, viceCaptainId: vc };

    if (teamProp) {
      if (onFinalSave) onFinalSave(updated);
      closeModal();
      return;
    }
    updateTeam(matchId, team.id, updated);
    closeModal();
    setTimeout(() => setSavedMessage(""), 2500);
  }

  if (!team) return <div className="py-8 text-center">No team</div>;

  return (
    <div className="flex flex-col sm:flex-row justify-center pb-16">
      <div className="w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pick Captain & Vice-Captain
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Select who will lead your team to victory
            </p>
          </div>
          {teamProp && (
            <button
              onClick={() => {
                if (onCancel) onCancel();
                else navigate(-1);
              }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close"
            >
              <CrossIcon className="w-5 h-5 fill-gray-700" />
            </button>
          )}
        </div>

        <div className="space-y-2 max-h-[70vh] overflow-y-auto">
          {team.players.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                  <img
                    src={p.teamLogo || "/placeholder.svg"}
                    alt={p.team}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-600 mt-0.5">
                    {p.teamShort} • {p.role}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => setCap(p.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    cap === p.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="Mark as Captain"
                >
                  C
                </button>
                <button
                  onClick={() => setVc(p.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    vc === p.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title="Mark as Vice Captain"
                >
                  VC
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute left-0 sm:left-4 right-0 sm:right-4 bottom-0 sm:bottom-4  flex justify-center pointer-events-none z-40">
        <div
          className="w-full max-w-2xl bg-white pointer-events-auto sm:rounded-xl shadow-[0_-4px_12px_rgba(0,0,0,0.15)]
 sm:border px-4 py-3 sm:flex items-center justify-between"
        >
          <div className="hidden sm:flex items-center gap-4">
            <div>
              {timeleft !== "Match Started" ? (
                <div className="text-center font-medium">
                  <span className="text-gray-400 text-sm sm:text-base">
                    Registration closed in:{" "}
                  </span>
                  <span className="text-pink-600">{timeleft}</span>
                </div>
              ) : (
                <div className="text-center font-medium">
                  <span className="text-sm sm:text-base text-gray-400">
                    Registration is closed
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 max-sm:w-full">
            <button
              onClick={save}
              className="max-sm:flex-1 px-4 py-2 rounded-md bg-pink-600 hover:cursor-pointer text-white text-sm"
            >
              Save Team
            </button>
          </div>
          {timeleft !== "Match Started" ? (
            <div className="sm:hidden mt-2 text-center font-medium">
              <span className="text-gray-400 text-sm sm:text-base">
                Registration closed in:{" "}
              </span>
              <span className="text-pink-600">{timeleft}</span>
            </div>
          ) : (
            <div className="sm:hidden mt-2 text-center font-medium">
              <span className="text-gray-400 text-sm sm:text-base">
                Registration is closed
              </span>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={modal.open}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
        onConfirm={modal.onConfirm}
      />
    </div>
  );
}
