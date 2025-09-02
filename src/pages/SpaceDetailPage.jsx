"use client"
import { useParams, Link } from "react-router-dom"
import { spaces } from "../data/spaces"
import BookingForm from "../components/BookingForm"

/**
 * Space Detail Page Component
 * Shows detailed information about a specific space
 */
function SpaceDetailPage() {
  const { spaceId } = useParams()
  const space = spaces.find((s) => s.id === Number.parseInt(spaceId))

  if (!space) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Space Not Found</h2>
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        ← Back to Spaces
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Space Information */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <img
            src={space.main_image || "/placeholder.svg"}
            alt={space.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          {/* Additional Images */}
          {space.images && space.images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              {space.images.map((image, index) => (
                <img
                  key={index}
                  src={image || "/placeholder.svg"}
                  alt={`${space.name} ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          {/* Space Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{space.name}</h1>

            <div className="flex items-center text-gray-600 mb-4">
              <span className="text-lg">📍 {space.location}</span>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-3xl font-bold text-blue-600">₱{space.price}/day</span>
            </div>

            <p className="text-gray-700 mb-6 leading-relaxed">{space.description}</p>

            {/* Hours */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Operating Hours</h3>
              <p className="text-gray-600">{space.hours}</p>
            </div>

            {/* Time Slots */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Time Slots</h3>
              <div className="flex flex-wrap gap-2">
                {space.time_slots.map((slot, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {slot}
                  </span>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {space.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <BookingForm space={space} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpaceDetailPage
