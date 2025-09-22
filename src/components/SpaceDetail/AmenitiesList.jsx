import React from "react";

export default function AmenitiesList({ amenities, getAmenityEmoji }) {
  return (
    <div className="mb-8">
      <h3 className="font-semibold text-xl text-slate-800 mb-4">Amenities</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {amenities.map((amenity, i) => (
          <div key={i} className="flex items-center bg-slate-50 px-4 py-3 rounded-lg">
            <span className="text-xl mr-3">{getAmenityEmoji(amenity)}</span>
            <span className="text-slate-700">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
