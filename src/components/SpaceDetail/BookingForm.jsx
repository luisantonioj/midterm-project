import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../MyBookings/ConfirmModal";

export default function BookingForm({ space, user, date, setDate, selectedSlot, setSelectedSlot, message, setMessage, handleBook, formatTime,}) {
  const [modal, setModal] = useState(null); // "confirm" | "success" | null
  const navigate = useNavigate();

  // Reset slot when date changes
  useEffect(() => setSelectedSlot(null), [date, setSelectedSlot]);

  // --- Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    setModal("confirm");
  };

  const handleConfirmBooking = () => {
    setModal(null);
    if (handleBook({ preventDefault: () => {} })) setModal("success");
  };

  const handleCloseSuccess = () => {
    setModal(null);
    navigate("/my-bookings");
  };

  // --- Helpers ---
  const getModalMessage = () => (
    <div>
      <p className="text-slate-700">Please review your booking details carefully before confirming your reservation.</p>
      <div className="bg-gray-50 border p-4 mt-4 rounded-lg text-gray-700 text-sm space-y-2">
        <div className="font-bold text-lg text-gray-900">{space.name}</div>
        <div>
          <div><span className="font-medium">Date:</span> {date}</div>
          <div>
            <span className="font-medium">Time:</span>{" "}
            {selectedSlot
              ? `${formatTime(selectedSlot.start)} - ${formatTime(selectedSlot.end)}`
              : "Not selected"}
          </div>
          <div><span className="font-medium">Price:</span> ₱{space.price}.00</div>
          <div><span className="font-medium">Location:</span> {space.location}</div>
        </div>
        <div>
          <span className="font-medium">Special Requests:</span>{" "}
          {message ? message : "None"}
        </div>
      </div>
    </div>
  );

  const renderSlots = () =>
    space.time_slots.map((slot, i) => {
      const isPast = new Date(`${date}T${slot.start}`) <= new Date();
      return (
        <option key={i} value={JSON.stringify(slot)} disabled={isPast}>
          {slot.label} ({formatTime(slot.start)} - {formatTime(slot.end)})
          {isPast ? " - Not Available" : ""}
        </option>
      );
    });

  return (
    <>
      <div className="sticky top-28 bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-indigo-700">₱{space.price}</div>
          <div className="text-slate-600">per slot</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required={!!user}
            />
          </div>

          {/* Time slot */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Time slot
            </label>
            <select
              value={selectedSlot ? JSON.stringify(selectedSlot) : ""}
              onChange={(e) => setSelectedSlot(JSON.parse(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              disabled={!date}
              required={!!user}
            >
              {!date ? (
                <option value="">Select a date first</option>
              ) : (
                <>
                  <option value="" disabled>
                    Select a time slot
                  </option>
                  {renderSlots()}
                </>
              )}
            </select>
          </div>

          {/* Special requests */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Special Requests (optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={3}
              placeholder="Any special requirements or notes..."
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            {!user && (
              <p className="text-sm text-amber-600 mb-4 text-center">
                <i className="fas fa-info-circle mr-1"></i>
                Please sign in to book your slot.
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 text-lg"
            >
              {user ? "Book Now" : "Sign In to Book"}
            </button>
          </div>
        </form>
      </div>

      {/* Modals */}
      {user && modal === "confirm" && (
        <ConfirmModal
          show
          onConfirm={handleConfirmBooking}
          onCancel={() => setModal(null)}
          title="Confirm Booking"
          message={getModalMessage()}
        />
      )}

      {user && modal === "success" && (
        <ConfirmModal
          show
          onConfirm={handleCloseSuccess}
          onCancel={handleCloseSuccess}
          title="Booking Confirmed!"
          message="Your booking has been confirmed! Go to My Bookings to view your reservation."
        />
      )}
    </>
  );
}

