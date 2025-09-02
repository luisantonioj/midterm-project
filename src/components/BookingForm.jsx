"use client"

import { useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useBooking } from "../contexts/BookingContext"

/**
 * Booking Form Component
 * Handles space booking for authenticated users
 */
function BookingForm({ space }) {
  const { user, isAuthenticated } = useAuth()
  const { addBooking } = useBooking()
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    notes: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!isAuthenticated) {
      alert("Please login to make a booking")
      return
    }

    // Create booking
    const booking = {
      userId: user.id,
      spaceId: space.id,
      spaceName: space.name,
      spaceLocation: space.location,
      date: formData.date,
      timeSlot: formData.timeSlot,
      notes: formData.notes,
      price: space.price,
    }

    addBooking(booking)
    setShowSuccess(true)

    // Reset form
    setFormData({
      date: "",
      timeSlot: "",
      notes: "",
    })

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  // Get tomorrow's date as minimum date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg">
        <p className="text-center text-gray-600">Please login to book this space</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Book This Space</h3>

      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Booking confirmed! Check your dashboard to manage bookings.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={minDate}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Slot</label>
          <select
            name="timeSlot"
            value={formData.timeSlot}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a time slot</option>
            {space.time_slots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Any special requirements or notes..."
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-semibold">Total: ₱{space.price}</div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-medium"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  )
}

export default BookingForm
