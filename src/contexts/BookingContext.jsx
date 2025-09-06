import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookingContext = createContext();

/**
 * bookings stored under "studyspot_bookings".
 * Booking object shape (recommended):
 * { id, userId, spaceId, spaceName, date, timeSlot, price, note }
 */
export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("studyspot_bookings", []);

  // add booking and return the created booking (useful for tests/navigation)
  const addBooking = (booking) => {
    // defensive: ensure bookings is an array
    setBookings((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      const newBooking = { id: Date.now(), ...booking };
      return [...arr, newBooking];
    });
  };

  const cancelBooking = (id) => {
    setBookings((prev) => {
      const arr = Array.isArray(prev) ? prev : [];
      return arr.filter((b) => b.id !== id);
    });
  };

  // helper: get bookings by user
  const getBookingsByUser = (userId) => {
    const arr = Array.isArray(bookings) ? bookings : [];
    return arr.filter((b) => b.userId === userId);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking, getBookingsByUser }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
