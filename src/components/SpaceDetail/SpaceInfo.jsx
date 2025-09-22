import React from "react";
import StarRating from "./StarRating";
import AmenitiesList from "./AmenitiesList";

export default function SpaceInfo({ space, getAmenityEmoji }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img 
        src={space.main_image} 
        alt={space.name} 
        className="w-full h-72 md:h-96 object-cover" 
      />
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{space.name}</h1>
          <div className="flex items-center text-slate-600 mb-2">
            <i className="fas fa-map-marker-alt mr-2 text-indigo-500"></i>
            <span>{space.location}</span>
          </div>
          <StarRating rating={space.rating} reviews={space.reviews} />
        </div>
        <p className="text-slate-700 leading-relaxed mb-8 text-lg">{space.description}</p>
        <AmenitiesList amenities={space.amenities} getAmenityEmoji={getAmenityEmoji} />
      </div>
    </div>
  );
}
