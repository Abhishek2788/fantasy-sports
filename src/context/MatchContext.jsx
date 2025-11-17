import React, { createContext, useContext, useEffect, useState } from "react";

const MatchContext = createContext(null);
const LOCAL_KEY = "fantasy_selected_match_v1";


export function MatchProvider({ children }) {
  const [match, setMatchState] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed;
    } catch (e) {
      console.error("Failed to read selected match from localStorage", e);
      return null;
    }
  });

  // persist whenever changed
  useEffect(() => {
    try {
      if (match === null) {
        localStorage.removeItem(LOCAL_KEY);
      } else {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(match));
      }
    } catch (e) {
      console.error("Failed to persist selected match to localStorage", e);
    }
  }, [match]);

  function setMatch(rawMatch) {
    const normalized = rawMatch;
    setMatchState(normalized);
  }

  function clearMatch() {
    setMatchState(null);
  }

  const value = { match, setMatch, clearMatch };

  return (
    <MatchContext.Provider value={value}>{children}</MatchContext.Provider>
  );
}

export function useMatchContext() {
  const ctx = useContext(MatchContext);
  if (!ctx) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return ctx;
}
