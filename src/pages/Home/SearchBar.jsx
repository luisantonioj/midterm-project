import React from "react";

export default function SearchBar({ query, setQuery }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
      <div className="flex">
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              🔍
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by location, space name, or amenity..."
              className="block w-full pl-10 pr-3 py-4 border-0 text-slate-900 placeholder-slate-500 focus:outline-none"
            />
          </div>
        </div>
        <button className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
          Search
        </button>
      </div>
    </div>
  );
}
