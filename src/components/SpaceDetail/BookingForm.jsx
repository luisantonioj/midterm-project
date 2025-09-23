import React, { useState } from "react";
import ConfirmModal from "../MyBookings/ConfirmModal";

export default function BookingForm({ space, user, date, setDate, selectedSlot, setSelectedSlot, message, setMessage, handleBook, formatTime }) {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleBook();
  };

  const handleCancel = () => {
    setShowModal(false); 
  }

  const modalMessage = `
    Space: ${space.name}
    Date: ${date}
    Time: ${formatTime(selectedSlot.start)} - ${formatTime(selectedSlot.end)}
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
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Time slot</label>
            <select
              value={selectedSlot ? JSON.stringify(selectedSlot) : ""}
              onChange={(e) => setSelectedSlot(JSON.parse(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              {space.time_slots.map((slot, i) => (
                <option key={i} value={JSON.stringify(slot)}>
                  {slot.label} ({formatTime(slot.start)} - {formatTime(slot.end)})
                </option>
              ))}
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
              {user ? "Book Now" : "Login to Book"}
            </button>
          </div>
        </form>
      </div>
      <ConfirmModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        title="Confirm Booking"
        message={modalMessage}
      />
    </>
  );
}
