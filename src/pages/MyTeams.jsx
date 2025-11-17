import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTeamContext } from "../context/TeamContext";
import { useMatchContext } from "../context/MatchContext";
import { getTimeLeft } from "../utils/commonUtils";
import { TeamCard } from "../components/TeamCard";
import { TeamCreationSuccessPopup } from "../components/TeamCreationSuccessPopup";
import { TeamPreviewPopup } from "../components/TeamPreviewPopup";

const MyTeams = () => {
  const { matchId } = useParams();
  const { match } = useMatchContext();
  const { teamsByMatch = [] } = useTeamContext();
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const timeleft = getTimeLeft(match?.match_date);
  const [savedMessage, setSavedMessage] = useState("");
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setTeams(teamsByMatch[matchId] || []);
  }, [teamsByMatch, matchId]);

  function handlePreview(team) {
    setSelected(team);
    setShowPreview(true);
  }

  function handleTeamRegistration() {
    if (!teams?.length || !selectedTeam) {
      setSavedMessage("Select a team to register");
      return;
    }
    const team = teams.find((t) => t.id === selectedTeam.id);
    if (!team) {
      setSavedMessage("Select a valid team");
      return;
    }
    setSavedMessage("Team saved successfully.");
    setTimeout(() => {
      setSavedMessage("");
      navigate("/");
    }, 2500);
  }

  return (
    <div className="mx-auto min-h-[85vh] bg-gray-50 flex flex-col">
      {showPreview && (
        <TeamPreviewPopup
          selected={selected.players}
          captain={selected.captainId}
          viceCaptain={selected.viceCaptainId}
          onClose={() => setShowPreview(false)}
        />
      )}
      {savedMessage && (
        <TeamCreationSuccessPopup
          savedMessage={savedMessage}
          onClose={() => setSavedMessage("")}
        />
      )}

      <div className="flex items-center justify-center bg-linear-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-6 shadow-lg">
        <div className="w-full max-w-2xl px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-white/20 rounded-lg flex items-center justify-center font-bold border-2 border-white/30">
              {match?.t1_short_name}
            </div>
            <div className="text-lg sm:text-2xl font-bold">vs</div>
            <div className="w-10 sm:w-14 h-10 sm:h-14 bg-white/20 rounded-lg flex items-center justify-center font-bold border-2 border-white/30">
              {match?.t2_short_name}
            </div>
          </div>
          {timeleft !== "Match Started" ? (
            <div className="text-right">
              <p className="text-xs text-blue-100">Registration closes in:</p>
              <p className="text-sm sm:text-lg font-bold text-emerald-300">
                {timeleft}
              </p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-sm sm:text-lg font-bold text-emerald-300">
                {timeleft}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="max-w-xl p-4 flex flex-col flex-1 justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Your Teams
              </h2>
              <p className="text-gray-600">
                Select a team to register for this match
              </p>
            </div>
            {teams && teams.length > 0 ? (
              teams.map((team, index) => (
                <TeamCard
                  index={index}
                  key={index}
                  team={team}
                  isSelected={selectedTeam?.id === team.id}
                  onSelect={(t) => setSelectedTeam(t)}
                  handlePreview={handlePreview}
                />
              ))
            ) : (
              <div className="text-center text-sm text-gray-500 mt-8">
                Create a team to register
              </div>
            )}
          </div>

          <div>
            <div className="mt-8 flex justify-between space-x-2">
              <Link
                to={`/matches/${matchId}/pick-players`}
                className="flex-1 py-3 bg-white border border-red-600 text-red-600 font-bold rounded-lg hover:bg-red-50 text-center"
              >
                Create Team
              </Link>
              <button
                onClick={() => handleTeamRegistration()}
                disabled={!teams?.length || !selectedTeam}
                className="flex-1 py-3 px-1 bg-red-600 hover:cursor-pointer text-white font-bold rounded-lg shadow-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Register Team{" "}
                {selectedTeam ? `with ${selectedTeam.creditsUsed ?? ""}` : ""}
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">{timeleft}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTeams;
