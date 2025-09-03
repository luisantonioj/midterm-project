import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // bookings: array of { id, userId, spaceId, spaceName, date, timeSlot, price }
  const [bookings, setBookings] = useLocalStorage("studyspot_bookings", []);

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, { id: Date.now(), ...booking }]);
  };

  const cancelBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
