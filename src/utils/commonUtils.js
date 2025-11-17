export const getTimeLeft = (matchDate) => {
  const target = new Date(matchDate);
  const now = new Date();

  let diff = target - now;

  if (diff <= 0) return "Match Started";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));

  const h = hours.toString().padStart(2, "0");
  const m = minutes.toString().padStart(2, "0");

  return `${h}h ${m}m Left`;
}

export const findPlayerById = (players = [], id) => {
  if (!id) return null;
  return (
    players.find(
      (p) =>
        p?.id === id ||
        p?.playerId === id ||
        String(p?.id) === String(id) ||
        String(p?.playerId) === String(id) ||
        String(p?.original?.id) === String(id)
    ) || null
  );
}

export const getRoleCounts = (players = []) => {
  const counts = { WK: 0, BAT: 0, AR: 0, BOWL: 0 };
  players.forEach((p) => {
    const role = String(p?.role || "").toUpperCase();
    if (role === "WK") counts.WK += 1;
    else if (role === "BAT") counts.BAT += 1;
    else if (role === "AR") counts.AR += 1;
    else if (role === "BOWL") counts.BOWL += 1;
    else {
      counts.BAT += 1;
    }
  });
  return counts;
}