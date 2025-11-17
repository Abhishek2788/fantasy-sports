export const ROLE_LIMITS = {
  batsman: { min: 3, max: 7 },
  wicketkeeper: { min: 1, max: 5 },
  allrounder: { min: 0, max: 4 },
  bowler: { min: 3, max: 7 },
};

export const TOTAL_PLAYERS = 11;
export const TOTAL_CREDITS = 100;
export const MAX_FROM_ONE_TEAM = 7;

export function canonicalRole(roleRaw) {
  const r = (roleRaw || "").toString().trim().toLowerCase();
  if (!r) return "batsman";
  if (["wk", "wicket", "wicket-keeper", "wicketkeeper", "keeper"].includes(r))
    return "wicketkeeper";
  if (["bat", "batsman", "batter"].includes(r)) return "batsman";
  if (["all", "all-rounder", "allrounder", "all rounder"].includes(r))
    return "allrounder";
  if (["bowl", "bowler", "bowling"].includes(r)) return "bowler";

  if (r === "wk") return "wicketkeeper";
  if (r === "bat") return "batsman";
  if (r === "ar") return "allrounder";
  if (r === "bowl") return "bowler";

  return "batsman";
}

export function getRoleCounts(selectedPlayers = []) {
  return selectedPlayers.reduce((acc, p) => {
    const key = canonicalRole(p.role || p.playerRole || "");
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
}

export function countFromEachTeam(selectedPlayers = []) {
  return selectedPlayers.reduce((acc, p) => {
    const teamKey = p.team ?? p.team_name ?? "Team";
    acc[teamKey] = (acc[teamKey] || 0) + 1;
    return acc;
  }, {});
}

export function totalCreditsUsed(selectedPlayers = []) {
  return selectedPlayers.reduce(
    (acc, p) => acc + Number(p.credits ?? p.credit ?? 0),
    0
  );
}

export function isSelectionValid(selectedPlayers = []) {
  if (selectedPlayers.length !== TOTAL_PLAYERS)
    return { valid: false, reason: `Team must have ${TOTAL_PLAYERS} players` };

  const roleCounts = getRoleCounts(selectedPlayers);
  for (const role of Object.keys(ROLE_LIMITS)) {
    const { min, max } = ROLE_LIMITS[role];
    const count = roleCounts[role] || 0;
    if (count < min || count > max) {
      return {
        valid: false,
        reason: `Role ${role} must be between ${min}-${max}. Current: ${count}`,
      };
    }
  }

  const credits = totalCreditsUsed(selectedPlayers);
  if (credits > TOTAL_CREDITS)
    return {
      valid: false,
      reason: `Credits exceed ${TOTAL_CREDITS}. Used: ${credits}`,
    };

  const byTeam = countFromEachTeam(selectedPlayers);
  if (Object.values(byTeam).some((c) => c > MAX_FROM_ONE_TEAM)) {
    return {
      valid: false,
      reason: `Cannot have more than ${MAX_FROM_ONE_TEAM} players from one team`,
    };
  }

  return { valid: true };
}
