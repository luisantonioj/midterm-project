"use client"

import { useState, useMemo } from "react"
import SearchBar from "../components/SearchBar"
import SpaceCard from "../components/SpaceCard"
import { spaces } from "../data/spaces"

/**
 * Home Page Component
 * Displays all spaces with search functionality
 */
function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter spaces based on search term
  const filteredSpaces = useMemo(() => {
    if (!searchTerm) return spaces

    return spaces.filter(
      (space) =>
        space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.location.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }, [searchTerm])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Study Space</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover co-working spaces and study hubs across the Philippines. Book your ideal workspace today.
        </p>
      </div>

      {/* Search Bar */}
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredSpaces.length} space{filteredSpaces.length !== 1 ? "s" : ""} found
          {searchTerm && ` for "${searchTerm}"`}
        </p>
      </div>

      {/* Spaces Grid */}
      {filteredSpaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No spaces found matching your search.</p>
        </div>
      )}
    </div>
  )
}

export default HomePage
