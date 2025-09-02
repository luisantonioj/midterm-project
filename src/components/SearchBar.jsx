"use client"

/**
 * Search Bar Component
 * Filters spaces by name or location
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default SearchBar
