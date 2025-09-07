import React, { useState } from "react";
import { Link } from "react-router-dom";

// Helper function to get tag class based on type
const getTagClass = (type) => {
  const classes = {
    premium: "bg-amber-100 text-amber-800",
    new: "bg-emerald-100 text-emerald-800",
    popular: "bg-rose-100 text-rose-800",
    default: "bg-slate-100 text-slate-800"
  };
  return classes[type] || classes.default;
};

export default function SpaceCard({ space }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const toggleAmenities = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllAmenities(!showAllAmenities);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all duration-300">
      <Link to={`/space/${space.id}`} className="block">
        <div className="relative">
          <img 
            src={space.main_image} 
            alt={space.name} 
            className="h-48 w-full object-cover" 
          />
          
          {/* Tag in upper left corner */}
          {space.tag && (
            <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${getTagClass(space.tag.type)}`}>
              {space.tag.label}
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-900 text-lg pr-2 leading-tight">{space.name}</h3>
            <div className="text-right whitespace-nowrap">
              <span className="text-lg font-bold text-indigo-600">₱{space.price}</span>
              <span className="text-slate-500 text-sm ml-0.5">/hr</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center text-slate-600 text-sm mt-0">
            <svg className="w-4 h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{space.location}</span>
          </div>
        </div>
      </Link>
      
      {/* Amenities - outside the link to prevent navigation when clicking */}
      {space.amenities && space.amenities.length > 0 && (
        <div className="px-4 pt-0">
          <div className="flex items-start text-slate-600 text-sm">
            <svg className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>
              {showAllAmenities 
                ? space.amenities.join(", ")
                : `${space.amenities.slice(0, 3).join(", ")}`
              }
              {space.amenities.length > 3 && (
                <button 
                  onClick={toggleAmenities}
                  className="text-indigo-600 hover:text-indigo-800 ml-1 font-medium text-xs"
                >
                  {showAllAmenities ? " Show less" : ` +${space.amenities.length - 3} more`}
                </button>
              )}
            </span>
          </div>
        </div>
      )}
      
      {/* Rating and Reviews */}
      <div className="px-4 pb-3 pt-0 border-slate-100">
        <div className="flex items-center">
          <svg className="w-4 h-4 text-slate-600 fill-current mr-1" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-sm font-medium text-slate-700 mr-1">{space.rating}</span>
          <span className="text-sm text-slate-500">({space.reviews} reviews)</span>
        </div>
      </div>
    </div>
  );
}