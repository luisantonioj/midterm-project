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
    <section className="relative h-[80vh] md:h-screen max-h-[900px] text-white overflow-hidden w-full">
      {/* Slideshow */}
      <div className="relative h-full w-full">
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
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-slate-900/90"></div>
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-1">
            Study Smarter,
          </h1>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 block text-indigo-400"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
          >
            Anywhere
          </h1>
          <p className="text-xl text-slate-200 max-w-3xl mx-auto mb-10">
            Easily discover and reserve the perfect study and co-working spaces nationwide
          </p>

          <SearchBar query={query} setQuery={setQuery} />
        </div>
      </div>
    </section>
  );
}
