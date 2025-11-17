import React from "react";

export default function PlayerFilters({ filters, setFilters, teams, roles }) {
  return (
    <div className="bg-white rounded p-4 space-y-3 shadow">
      <div className="grid grid-cols-2 gap-2">
        <select
          value={filters.role}
          onChange={(e) => setFilters((f) => ({ ...f, role: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <select
          value={filters.team}
          onChange={(e) => setFilters((f) => ({ ...f, team: e.target.value }))}
          className="border p-2 rounded"
        >
          <option value="">All Teams</option>
          {teams.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-sm">Max credits:</label>
        <input
          type="number"
          value={filters.maxCredit}
          onChange={(e) =>
            setFilters((f) => ({ ...f, maxCredit: e.target.value }))
          }
          className="border p-2 rounded w-28"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setFilters({ role: "", team: "", maxCredit: "" })}
          className="px-3 py-1 bg-gray-100 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
