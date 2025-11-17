import { TickIcon } from "./icons/TickIcon";

export const PlayerCard = ({ player, selected, onToggle }) => {
  return (
    <button
      key={player.id}
      onClick={onToggle}
      className="flex w-full items-center gap-4 px-6 py-4 hover:bg-linear-to-r hover:from-blue-50 hover:to-transparent transition-all group hover:cursor-pointer"
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border-2 border-blue-200 bg-linear-to-br from-blue-100 to-purple-100 shadow-md group-hover:shadow-lg transition-all">
          <img
            src={player.teamLogo || "/placeholder.svg"}
            alt={player.team}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <div className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {player.name}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {player.teamShort || player.team} • {player.role}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-6 shrink-0">
        <div className="text-sm font-medium text-gray-600 w-10 text-right">
          {player.points}
        </div>
        <div className="text-sm font-bold text-purple-600 w-12 text-right">
          {Number(player.credits).toFixed(1)}
        </div>
        <div
          className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 transition-all shrink-0 ${
            selected
              ? "bg-linear-to-br from-blue-500 to-purple-600 border-purple-600 shadow-lg scale-110"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
          }`}
        >
          {selected && <span className="text-white text-xs font-bold">✓</span>}
        </div>
      </div>
    </button>
  );
};
