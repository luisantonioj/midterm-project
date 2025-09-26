import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import BookingList from "../components/MyBookings/BookingList";
import ConfirmModal from "../components/MyBookings/ConfirmModal";
import Login from "./Login";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking, deleteBooking, isLoading } = useBookings();
  const [selectedCancel, setSelectedCancel] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  if (!user) return <Login />;

  const myBookings = (Array.isArray(bookings) ? bookings : []).filter((b) => b.userId === user.id);

  const handleCancelConfirm = () => {
    cancelBooking(selectedCancel);
    setSelectedCancel(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 pt-28">
      <div className="mb-1">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        {/* <p className="text-gray-600 mt-2">Manage your upcoming and past bookings</p> */}
      </div>

      <BookingList
        bookings={myBookings}
        isLoading={isLoading}
        onCancel={cancelBooking}
        onDelete={deleteBooking}
        deletingId={deletingId}
      />

      {/* Global Confirm Modals */}
      <ConfirmModal
        show={!!selectedCancel}
        onConfirm={handleCancelConfirm}
        onCancel={() => setSelectedCancel(null)}
        message="Are you sure you want to cancel this booking?"
        title="Cancel Booking"
      />
    </div>
  );
}
