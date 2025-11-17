import React, { createContext, useContext, useEffect, useState } from "react";

const TeamContext = createContext();

function storageKey(matchId) {
  return `fantasy_teams_${matchId}`;
}

export function TeamProvider({ children }) {
  const [teamsByMatch, setTeamsByMatch] = useState({});

  // Load all matches from localStorage on mount
  useEffect(() => {
    try {
      const next = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("fantasy_teams_")) {
          const matchId = key.replace("fantasy_teams_", "");
          const raw = localStorage.getItem(key);
          next[matchId] = raw ? JSON.parse(raw) : [];
        }
      }
      setTeamsByMatch(next);
    } catch (e) {
      console.error("load local teams", e);
    }
  }, []);

  // Helper to persist a single match
  function persistMatch(matchId, arr) {
    try {
      localStorage.setItem(storageKey(matchId), JSON.stringify(arr));
    } catch (e) {
      console.error("persist teams", e);
    }
  }

  function addTeam(matchId, team) {
    setTeamsByMatch((prev) => {
      const arr = prev[matchId] ? [team, ...prev[matchId]] : [team];
      const next = { ...prev, [matchId]: arr };
      persistMatch(matchId, arr);
      return next;
    });
  }

  function updateTeam(matchId, teamId, newTeam) {
    setTeamsByMatch((prev) => {
      const arr = (prev[matchId] || []).map((t) =>
        t.id === teamId ? newTeam : t
      );
      const next = { ...prev, [matchId]: arr };
      persistMatch(matchId, arr);
      return next;
    });
  }

  function removeTeam(matchId, teamId) {
    setTeamsByMatch((prev) => {
      const arr = (prev[matchId] || []).filter((t) => t.id !== teamId);
      const next = { ...prev, [matchId]: arr };
      persistMatch(matchId, arr);
      return next;
    });
  }

  return (
    <TeamContext.Provider
      value={{ teamsByMatch, addTeam, updateTeam, removeTeam }}
    >
      {children}
    </TeamContext.Provider>
  );
}

export function useTeamContext() {
  return useContext(TeamContext);
}
