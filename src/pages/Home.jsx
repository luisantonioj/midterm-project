import React, { useState, useMemo, useEffect } from "react";
import spacesData from "../data/spaces.json";
import SpaceCard from "../components/SpaceCard";

// Import your local images
const heroImages = [
  "/images/1-studeospaces/1.1.jpg",
  "/images/3-beanspace/3.1.jpeg",
  "/images/4-bigideas/4.1.jpg",
  "/images/5-theplayground/5.1.png",
  "/images/6-thecompany/6.1.jpg",
  "/images/7-studyout/7.1.jpg",
  "/images/8-sharedspace/8.1.jpg",
  "/images/9-co.lab/9.1.jpg",
  "/images/10-smartwork/10.1.jpg"
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample amenities filter options
  const amenityOptions = ["wifi", "power", "coffee", "printer", "ac", "parking"];
  
  // Categories for filtering
  const categories = [
    { id: "all", name: "All Spaces" },
    { id: "premium", name: "Premium" },
    { id: "quiet", name: "Quiet Zones" },
    { id: "group", name: "Group Spaces" },
    { id: "cafe", name: "Cafe Style" }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

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
      
      // Category filter
      const matchesCategory = activeCategory === "all" || 
        (space.category && space.category === activeCategory);
      
      return matchesSearch && matchesAmenities && matchesCategory;
    });
  }, [query, selectedAmenities, activeCategory]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity) 
        : [...prev, amenity]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen max-h-[800px] text-white overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        {/* Slideshow */}
        <div className="relative h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Study space ${index + 1}`} 
                className="w-full h-full object-cover min-w-full"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/90"></div>
            </div>
          ))}
        </div>
        
        {/* Rest of your hero content remains the same */}
        {/* Navigation Arrows */}
        <button 
          onClick={goToPrevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={goToNextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 rounded-full hover:bg-black/50 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Find Your Perfect
              <span className="block text-indigo-400">Study Space</span>
            </h1>
            <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-10">
              Discover and book the best co-working spaces and study hubs across the Philippines
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="flex">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by location, space name, or amenity..."
                      className="block w-full pl-10 pr-3 py-4 border-0 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
                <button className="px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>
            
            {/* Quick Filters */}
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {amenityOptions.slice(0, 4).map(amenity => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={`px-4 py-2 rounded-full text-sm font-medium flex items-center ${
                    selectedAmenities.includes(amenity)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20'
                  }`}
                >
                  <span className="capitalize">{amenity}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Results header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Available Spaces</h2>
              <p className="text-slate-600 mt-1">
                {filtered.length} {filtered.length === 1 ? 'space' : 'spaces'} found
                {query && ` for "${query}"`}
              </p>
            </div>
            
            {/* Amenities Filter */}
            <div className="mt-4 md:mt-0">
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
      </div>
    </div>
  );
}