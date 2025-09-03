import React, { useState, useMemo } from "react";
import spacesData from "../data/spaces.json"; // your data file. :contentReference[oaicite:3]{index=3}
import SpaceCard from "../components/SpaceCard";

export default function Home() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return spacesData;
    return spacesData.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Discover study spaces</h1>
        <p className="text-sm text-gray-600">Search by name or location</p>

        <div className="mt-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. Makati, Studeo"
            className="w-full md:w-1/2 px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}
