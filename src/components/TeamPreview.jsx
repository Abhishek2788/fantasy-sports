export default function TeamPreview({ captain, viceCaptain, players = [] }) {
  return (
    <div className="max-h-[70vh] overflow-y-auto">
      <div className="space-y-2">
        {players.length === 0 && (
          <div className="text-sm text-slate-500 py-6 text-center">
            No players selected
          </div>
        )}
        {players.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between py-2 border-b last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border">
                {p.teamLogo ? (
                  <img
                    src={p.teamLogo}
                    alt={p.team}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-xs">
                    {p.teamShort || p.team}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{p.name}</div>
                  <div className="text-pink-500 font-medium">
                    {String(p.id) === String(captain)
                      ? "Captain"
                      : String(p.id) === String(viceCaptain)
                      ? "Vice Captain"
                      : ""}
                  </div>
                </div>
                <div className="text-[12px] text-slate-500">
                  {p.team} - {p.role}
                </div>
              </div>
            </div>
            <div className="text-sm font-semibold">{p.credits.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
