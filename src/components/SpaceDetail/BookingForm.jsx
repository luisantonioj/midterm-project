import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../MyBookings/ConfirmModal";

export default function BookingForm({ space, user, date, setDate, selectedSlot, setSelectedSlot, message, setMessage, handleBook, formatTime }) {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSlot(null);
  }, [date, setSelectedSlot]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    const syntheticEvent = { preventDefault: () => {} };
    const success = handleBook(syntheticEvent);
    if (success) {
      setShowSuccessModal(true);
    }
  };

  const handleCancel = () => {
    setShowModal(false); 
  }

  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/my-bookings");
  };

  const modalMessage = selectedSlot
  ? `
    Space: ${space.name}
    Date: ${date}
    Time: ${formatTime(selectedSlot.start)} - ${formatTime(selectedSlot.end)}
    ${message ? `Special Requests: ${message}` : "No special requests"}
  `
  : `
    Space: ${space.name}
    Date: ${date}
    Time: Not selected
    ${message ? `Special Requests: ${message}` : "No special requests"}
  `;

  return (
    <>
      <div className="sticky top-28 bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-indigo-700">₱{space.price}</div>
          <div className="text-slate-600">per slot</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)}
              min={new Date().toLocaleDateString('en-CA')} 
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              required={!!user}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Time slot</label>
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
                <option value="" disabled>
                  Select a time slot
                </option>
              )}

              {date &&
                space.time_slots.map((slot, i) => {
                  const slotDateTime = new Date(`${date}T${slot.start}`);
                  const isPast = slotDateTime <= new Date();

                  return (
                    <option
                      key={i}
                      value={JSON.stringify(slot)}
                      disabled={isPast}
                    >
                      {slot.label} ({formatTime(slot.start)} - {formatTime(slot.end)})
                      {isPast ? " - Not Available" : ""}
                    </option>
                  );
                })}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests (optional)</label>
            <textarea 
              value={message} 
              onChange={e => setMessage(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
              rows={3}
              placeholder="Any special requirements or notes..."
            />
          </div>

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

      {user && (
        <ConfirmModal
          show={showModal}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          title="Confirm Booking"
          message={modalMessage}
        />
      )}

      {user && (
        <ConfirmModal
          show={showSuccessModal}
          onConfirm={handleSuccessConfirm}
          onCancel={handleSuccessConfirm} 
          title="Booking Confirmed!"
          message="Your booking has been confirmed! Go to My Bookings to view your reservation."
        />
      )}
    </>
  );
}
