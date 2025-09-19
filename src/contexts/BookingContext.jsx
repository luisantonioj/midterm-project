import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("studyspot_bookings", []);

  const addBooking = (booking) => {
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

  const deleteBooking = (id) => {
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

  // get booking count by user
  const getBookingCountByUser = (userId) => {
    const arr = Array.isArray(bookings) ? bookings : [];
    return arr.filter((b) => b.userId === userId).length;
  };

  const value = {
    bookings,
    addBooking,
    cancelBooking,
    deleteBooking,
    getBookingsByUser,
    getBookingCountByUser
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}