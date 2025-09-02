import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BookingContext = createContext();

export function useBookings() {
  return useContext(BookingContext);
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage('bookings', []);
  
  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking
    };
    setBookings([...bookings, newBooking]);
    return newBooking;
  };
  
  const cancelBooking = (id) => {
    setBookings(bookings.filter(booking => booking.id !== id));
  };
  
  const getUserBookings = (userId) => {
    return bookings.filter(booking => booking.userId === userId);
  };
  
  const value = {
    bookings,
    addBooking,
    cancelBooking,
    getUserBookings
  };
  
  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}