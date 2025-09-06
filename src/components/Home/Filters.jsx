import React from "react";

export default function Filters({
  amenityOptions,
  selectedAmenities,
  toggleAmenity,
  query,
  resultCount,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Available Spaces</h2>
        <p className="text-slate-600 mt-1">
          {resultCount} {resultCount === 1 ? "space" : "spaces"} found
          {query && ` for "${query}"`}
        </p>
      </div>

      <div className="mt-4 md:mt-0">
        <h3 className="text-sm font-medium text-slate-700 mb-2">
          Filter by amenities:
        </h3>
        <div className="flex flex-wrap gap-2">
          {amenityOptions.map((amenity) => (
            <button
              key={amenity}
              onClick={() => toggleAmenity(amenity)}
              className={`px-3 py-1.5 text-sm rounded-full ${
                selectedAmenities.includes(amenity)
                  ? "bg-indigo-100 text-indigo-700 border border-indigo-300"
                  : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
            >
              <span className="capitalize">{amenity}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
