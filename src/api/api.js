export const UPCOMING_MATCHES_URL = import.meta.env.VITE_UPCOMING_MATCHES_URL;
export const PLAYERS_OF_MATCH_URL = import.meta.env.VITE_PLAYERS_OF_MATCH_URL;

export async function fetchMatches() {
  const res = await fetch(UPCOMING_MATCHES_URL);
  if (!res.ok) throw new Error("Failed to fetch matches");
  return res.json();
}

export async function fetchPlayers(matchId) {
  const res = await fetch(PLAYERS_OF_MATCH_URL);
  if (!res.ok) throw new Error("Failed to fetch players");
  const data = await res.json();
  // API may not filter by matchId; return all and let UI filter if needed
  return data;
}
