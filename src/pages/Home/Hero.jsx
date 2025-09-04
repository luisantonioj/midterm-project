import React from "react";
import SearchBar from "./SearchBar";

export default function Hero({
  heroImages,
  currentSlide,
  setCurrentSlide,
  query,
  setQuery,
  amenityOptions,
  selectedAmenities,
  toggleAmenity,
}) {
  const goToSlide = (index) => setCurrentSlide(index);
  const goToNextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const goToPrevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  return (
    <section className="relative h-screen max-h-[800px] text-white overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* Slideshow */}
      <div className="relative h-full">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              alt={`Study space ${index + 1}`}
              className="w-full h-full object-cover min-w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/90"></div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 rounded-full hover:bg-black/50"
      >
        ◀
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/30 rounded-full hover:bg-black/50"
      >
        ▶
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
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
            Discover and book the best co-working spaces and study hubs across
            the Philippines
          </p>

          <SearchBar query={query} setQuery={setQuery} />

          {/* Quick Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {amenityOptions.slice(0, 4).map((amenity) => (
              <button
                key={amenity}
                onClick={() => toggleAmenity(amenity)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedAmenities.includes(amenity)
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                <span className="capitalize">{amenity}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
