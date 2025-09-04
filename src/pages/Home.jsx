import React, { useState, useMemo } from "react";
import spacesData from "../data/spaces.json";
import SpaceCard from "../components/SpaceCard";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  // Sample amenities filter options
  const amenityOptions = ["wifi", "power", "coffee", "printer", "ac", "parking"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    
    return spacesData.filter((space) => {
      // Text search
      const matchesSearch = !q || 
        space.name.toLowerCase().includes(q) ||
        space.location.toLowerCase().includes(q);
      
      // Amenities filter
      const matchesAmenities = selectedAmenities.length === 0 || 
        selectedAmenities.every(amenity => 
          space.amenities && space.amenities.includes(amenity)
        );
      
      return matchesSearch && matchesAmenities;
    });
  }, [query, selectedAmenities]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Discover Study Spaces</h1>
        <p className="text-slate-600 mt-2">Find the perfect co-working space for your needs</p>

        {/* Search Bar */}
        <div className="mt-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or location..."
            className="pl-10 w-full md:w-1/2 px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Amenities Filter */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-slate-700 mb-2">Filter by amenities:</h3>
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map(amenity => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-1.5 text-sm rounded-full flex items-center ${
                  selectedAmenities.includes(amenity)
                    ? 'bg-indigo-100 text-indigo-700 border border-indigo-300'
                    : 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200'
                }`}
              >
                <span className="capitalize">{amenity}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-slate-600">
          {filtered.length} {filtered.length === 1 ? 'space' : 'spaces'} found
        </p>
      </div>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-slate-900">No spaces found</h3>
          <p className="mt-2 text-slate-600">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}