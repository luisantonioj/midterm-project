import React from "react";
import { Link } from "react-router-dom";

// Helper function to get tag class based on type
const getTagClass = (type) => {
  switch (type) {
    case "premium":
      return "bg-amber-100 text-amber-800";
    case "new":
      return "bg-emerald-100 text-emerald-800";
    case "popular":
      return "bg-rose-100 text-rose-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
};

// Amenity icons mapping
const AmenityIcon = ({ type }) => {
  const icons = {
    wifi: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    power: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    coffee: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 14.857A5.714 5.714 0 0 1 8.714 9.143h6.572A5.714 5.714 0 0 1 21 14.857a2.857 2.857 0 0 1-2.857 2.857H5.857A2.857 2.857 0 0 1 3 14.857zM17.143 9.143V6a2.571 2.571 0 0 0-2.571-2.571H9.428A2.571 2.571 0 0 0 6.857 6v3.143" />
      </svg>
    ),
    printer: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m4 4h6a2 2 0 002-2v-4a2 2 0 00-2-2h-6a2 2 0 00-2 2v4a2 2 0 002 2z" />
      </svg>
    ),
    ac: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h10a4 4 0 004-4v-4H3v4zm0-8h18" />
      </svg>
    ),
    parking: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13l2 2 4-4" />
      </svg>
    )
  };

  return icons[type] || null;
};

export default function SpaceCard({ space }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 hover:shadow-md transition-all duration-300">
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
        
        {/* Favorite button in upper right corner */}
        <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full backdrop-blur-sm hover:bg-white transition-colors">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate">{space.name}</h3>
            <div className="flex items-center mt-1 text-slate-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm truncate">{space.location}</p>
            </div>
          </div>
          
          <div className="ml-2 flex-shrink-0">
            <span className="text-lg font-bold text-indigo-600">₱{space.price}</span>
            <span className="block text-xs text-slate-500 text-right">per hour</span>
          </div>
        </div>
        
        {/* Amenities */}
        {space.amenities && space.amenities.length > 0 && (
          <div className="mt-3 flex items-center space-x-3">
            {space.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center text-slate-500" title={amenity}>
                <AmenityIcon type={amenity} />
              </div>
            ))}
            {space.amenities.length > 4 && (
              <span className="text-xs text-slate-400">+{space.amenities.length - 4} more</span>
            )}
          </div>
        )}
        
        {/* Rating and View Button */}
        <div className="mt-4 flex items-center justify-between">
          {space.rating && (
            <div className="flex items-center">
              <div className="flex text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-4 h-4 fill-current" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-sm font-medium text-slate-700">{space.rating}</span>
              <span className="mx-1 text-slate-400">•</span>
              <span className="text-sm text-slate-500">{space.reviews} reviews</span>
            </div>
          )}
          
          <Link 
            to={`/space/${space.id}`} 
            className="px-3 py-1.5 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors font-medium"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}