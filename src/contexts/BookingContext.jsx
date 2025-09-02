"use client"

import { createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

const BookingContext = createContext()

/**
 * Booking Context Provider
 * Manages user bookings with localStorage persistence
 */
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("studyspot_bookings", [])

  // Add a new booking
  const addBooking = (bookingData) => {
    const newBooking = {
      id: Date.now(), // Simple ID generation
      ...bookingData,
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    return newBooking
  }

  // Cancel a booking by ID
  const cancelBooking = (bookingId) => {
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
  }

  // Get bookings for a specific user
  const getUserBookings = (userId) => {
    return bookings.filter((booking) => booking.userId === userId)
  }

  const value = {
    bookings,
    addBooking,
    cancelBooking,
    getUserBookings,
  }

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
