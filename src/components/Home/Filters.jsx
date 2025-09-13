import React, { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Filters({
  selectedAmenities,
  toggleAmenity,
  query,
  resultCount,
  spacesData
}) {
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState({ left: false, right: false });

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    
    setShowArrows({
      left: el.scrollLeft > 0,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 1
    });
  };

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir === 'right' ? 200 : -200, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    el.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll(); // Initial check
    
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [spacesData]);

  // Get unique amenities
  const amenities = [...new Set(spacesData.flatMap(space => space.amenities))];

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Available Spaces</h2>
          <p className="text-slate-600 mt-1">
            {resultCount} {resultCount === 1 ? "space" : "spaces"} found
            {query && ` for "${query}"`}
          </p>
        </div>
      </div>

      {/* Scrollable Amenities */}
      <div className="relative">
        {/* Arrows */}
        {showArrows.left && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
          </button>
        )}
        
        {showArrows.right && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <ChevronRightIcon className="h-5 w-5 text-gray-700" />
          </button>
        )}

        {/* Amenities Pills */}
        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide pb-3 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="inline-flex space-x-2 whitespace-nowrap">
            {amenities.map(amenity => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex-shrink-0 ${
                  selectedAmenities.includes(amenity)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {amenity.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}