import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingContext';
import BookingCard from '../components/BookingCard';

export default function Dashboard() {
  const { user } = useAuth();
  const { getUserBookings, cancelBooking } = useBookings();
  const userBookings = getUserBookings(user?.id);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {userBookings.length === 0 ? (
        <p className="text-center text-gray-600">You don't have any bookings yet.</p>
      ) : (
        <div>
          {userBookings.map(booking => (
            <BookingCard 
              key={booking.id} 
              booking={booking} 
              onCancel={cancelBooking}
            />
          ))}
        </div>
      )}
    </div>
  );
}