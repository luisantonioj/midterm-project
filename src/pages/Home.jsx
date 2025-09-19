import React, { useState, useMemo, useEffect } from "react";
import spacesData from "../data/spaces.json";
import SpaceCard from "../components/Home/SpaceCard";
import Hero from "../components/Home/Hero";
import SearchBar from "../components/Home/SearchBar";
import Filters from "../components/Home/Filters";
import SpacesGrid from "../components/Home/SpacesGrid";

const heroImages = [
  "/images/1-studeospaces/1.1.jpg",
  "/images/3-beanspace/3.1.jpeg",
  "/images/4-bigideas/4.1.jpg",
  "/images/5-theplayground/5.1.png",
  "/images/6-thecompany/6.1.jpg",
  "/images/7-studyout/7.1.jpg",
  "/images/8-sharedspace/8.1.jpg",
  "/images/9-co.lab/9.1.jpg",
  "/images/10-smartwork/10.1.jpg",
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("currentPage")) || 1
  );

  const amenityOptions = ["wifi", "power", "coffee", "printer", "ac", "parking"];

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return spacesData.filter((space) => {
      const matchesSearch =
        !q ||
        space.name.toLowerCase().includes(q) ||
        space.location.toLowerCase().includes(q);

      const matchesAmenities =
        selectedAmenities.length === 0 ||
        selectedAmenities.every(
          (amenity) =>
            space.amenities && space.amenities.includes(amenity)
        );

      const matchesCategory =
        activeCategory === "all" ||
        (space.category && space.category === activeCategory);

      return matchesSearch && matchesAmenities && matchesCategory;
    });
  }, [query, selectedAmenities, activeCategory]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
    setCurrentPage(1);
    localStorage.setItem("currentPage", 1);
  };

  return (
    <div className="min-h-screen">
      <Hero
        heroImages={heroImages}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        query={query}
        setQuery={setQuery}
        amenityOptions={amenityOptions}
        selectedAmenities={selectedAmenities}
        toggleAmenity={toggleAmenity}
      />

      <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Filters
          amenityOptions={amenityOptions}
          selectedAmenities={selectedAmenities}
          toggleAmenity={toggleAmenity}
          query={query}
          resultCount={filtered.length}
          spacesData={spacesData}
        />
        <SpacesGrid 
          spaces={filtered}
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}