import React from "react";
import { Link } from "react-router-dom";
import { useMatchContext } from "../context/MatchContext";

export default function MatchCard({ match }) {
  const { id, teamA, teamB, date } = match;
  const { setMatch } = useMatchContext();
  return (
    <Link
      to={`/matches/${id}/my-teams`}
      onClick={() => setMatch(match)}
      className="h-[165px] w-full sm:w-[380px] bg-linear-to-r from-white to-purple-200 rounded-sm px-6 py-8 shadow-sm flex items-center justify-center hover:cursor-pointer"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <img
            src={match.t1_image}
            alt={match.t1_name}
            className="w-auto h-20 object-contain"
          />
          <div>
            {match.is_ipl ? (
              <div className="text-xs font-medium text-slate-500 text-center">
                10th IPL Match
              </div>
            ) : (
              <div className="text-xs font-medium text-slate-500 text-center">
                {match.event_name}
              </div>
            )}
            <div className="flex gap-2 items-center mt-1">
              <span className="text-xl font-bold">{match.t1_short_name}</span>
              <span className="text-lg font-bold">vs</span>
              <span className="text-xl font-bold">{match.t2_short_name}</span>
            </div>
          </div>
          <img
            src={match.t2_image}
            alt={match.t2_name}
            className="w-auto h-20 object-contain"
          />
        </div>
      </div>
    </Link>
  );
}
