import { findPlayerById, getRoleCounts } from "../utils/commonUtils";
import { TickIcon } from "./icons/TickIcon";

export const TeamCard = ({ index, team, isSelected, onSelect, onPreview, handlePreview }) => {
  const players = team?.players || [];
  const captain = findPlayerById(players, team?.captainId);
  const viceCaptain = findPlayerById(players, team?.viceCaptainId);
  const stats = getRoleCounts(players);

  return (
    <div
      onClick={() => onSelect?.(team)}
      className={`bg-white rounded-lg p-4 mb-3 shadow-md border cursor-pointer`}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className={`w-5 h-5 rounded-sm flex items-center justify-center border transition ${
              isSelected
                ? "bg-pink-600 border-pink-600 text-white"
                : "bg-white border-gray-400"
            }`}
          >
            {isSelected ? <TickIcon /> : null}
          </div>
          <div>
            <div className="font-bold">{`Team ${index + 1}`}</div>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePreview(team);
          }}
          className="text-red-600 font-semibold text-sm hover:cursor-pointer"
        >
          Team Preview
        </button>
      </div>

      <div className="flex items-center justify-start space-x-6 text-sm text-gray-700">
        <div className="flex items-center">
          <img
            src={captain.teamLogo}
            alt={captain.team}
            className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm text-white bg-gray-300"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{captain?.name ?? "—"}</span>
            <span className="text-xs text-teal-500 font-medium">Captain</span>
          </div>
        </div>
        <div className="flex items-center">
          <img
            src={viceCaptain.teamLogo}
            alt={viceCaptain.team}
            className="w-8 h-8 rounded-full mr-3 flex items-center justify-center text-sm text-white bg-gray-300"
          />
          <div className="flex flex-col">
            <span className="font-semibold">{viceCaptain?.name ?? "—"}</span>
            <span className="text-xs text-teal-500 font-medium">
              Vice Captain
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4 text-xs font-medium text-gray-600">
        <div>
          WK: <span className="text-gray-900">{stats.WK}</span>
        </div>
        <div>
          BAT: <span className="text-gray-900">{stats.BAT}</span>
        </div>
        <div>
          AR: <span className="text-gray-900">{stats.AR}</span>
        </div>
        <div>
          BOWL: <span className="text-gray-900">{stats.BOWL}</span>
        </div>
      </div>
    </div>
  );
};
