import { Link } from "react-router-dom"

/**
 * Space Card Component
 * Displays space information in a card format
 */
function SpaceCard({ space }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img src={space.main_image || "/placeholder.svg"} alt={space.name} className="w-full h-48 object-cover" />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{space.name}</h3>

        <p className="text-gray-600 mb-2">📍 {space.location}</p>

        <p className="text-gray-700 mb-4 line-clamp-3">{space.description}</p>

        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">₱{space.price}/day</div>

          <Link
            to={`/space/${space.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            View Details
          </Link>
        </div>

        <div className="mt-3 text-sm text-gray-500">Hours: {space.hours}</div>
      </div>
    </div>
  )
}

export default SpaceCard
