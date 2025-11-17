import React, { useEffect, useState } from "react";
import { fetchMatches } from "../api/api";
import MatchCard from "../components/MatchCard";

export default function UpcomingMatches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMatches()
      .then((data) => {
        const arr =
          data && data.matches && data.matches.cricket
            ? data.matches.cricket
            : [];

        setMatches(arr);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-8 text-center">Loading...</div>;

  return (
    <div className="flex ">
      {/* cards */}
      <div className="mt-3 space-y-3 w-full">
        {matches.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </div>
  );
}
