import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import ConfirmModal from "../components/MyBookings/ConfirmModal";
import Login from "./Login";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBookings();

  if (!user) {
    return <Login />;
  }

  const myBookings = (Array.isArray(bookings) ? bookings : []).filter((b) => b.userId === user.id);

  const [selectedCancel, setSelectedCancel] = useState(null);

  const handleCancelConfirm = () => {
    cancelBooking(selectedCancel);
    setSelectedCancel(null);
  };

  return (
    <div className="max-w-4xl mx-auto pt-27 px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-gray-500 mt-2">Bookings persist across refresh (localStorage)</p>
      </div>

      {myBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Your upcoming bookings will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myBookings.map((b) => (
            <div key={b.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center transition-all hover:shadow-md">
              <div className="flex-1 mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-lg text-gray-800">{b.spaceName}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {b.timeSlot}
                  </span>
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-medium">Date:</span> {b.date}
                </div>
                <div className="text-gray-600 mb-1">
                  <span className="font-medium">Price:</span> ₱{b.price}
                </div>
                {b.note && (
                  <div className="text-gray-600 mt-2">
                    <span className="font-medium">Note:</span> {b.note}
                  </div>
                )}
              </div>
              <button 
                onClick={() => setSelectedCancel(b.id)} 
                className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                Cancel
              </button>
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