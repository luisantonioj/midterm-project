import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import ConfirmModal from "../components/ConfirmModal";

export default function Dashboard() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();

  // Defensive: if user is not present (should be prevented by ProtectedRoute),
  // render a friendly message instead of throwing when accessing user.id
  if (!user) {
    return (
      <div>
        <h1 className="text-2xl font-semibold">My Bookings</h1>
        <div className="bg-white p-6 rounded shadow mt-4">
          You are not logged in. Please <a href="/login" className="text-blue-600 underline">log in</a> to see your bookings.
        </div>
      </div>
    );
  }

  const myBookings = (Array.isArray(bookings) ? bookings : []).filter((b) => b.userId === user.id);

  const [selectedCancel, setSelectedCancel] = useState(null);

  const handleCancelConfirm = () => {
    cancelBooking(selectedCancel);
    setSelectedCancel(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">My Bookings</h1>
      <p className="text-sm text-gray-600 mb-4">Bookings persist across refresh (localStorage)</p>

      {myBookings.length === 0 ? (
        <div className="bg-white p-6 rounded shadow">You have no bookings yet.</div>
      ) : (
        <div className="grid gap-4">
          {myBookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <div className="font-semibold">{b.spaceName} • {b.timeSlot}</div>
                <div className="text-sm text-gray-600">Date: {b.date} • ₱{b.price}</div>
                {b.note && <div className="text-sm mt-1">Note: {b.note}</div>}
              </div>
              <div>
                <button onClick={() => setSelectedCancel(b.id)} className="px-3 py-1 border rounded text-red-600">Cancel</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        show={!!selectedCancel}
        onConfirm={handleCancelConfirm}
        onCancel={() => setSelectedCancel(null)}
        message="Are you sure you want to cancel this booking?"
      />
    </div>
  );
}
