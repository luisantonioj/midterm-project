import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function BookingCard({ booking, onCancel, onDelete, deletingId }) {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // const isCompleted = new Date(booking.date) < new Date();
  // const isUpcoming = !isCompleted;

  const getBookingEndTime = () => {
    if (!booking.date || !booking.timeSlot?.end) return null;

    const bookingEnd = new Date(`${booking.date} ${booking.timeSlot.end}`);
    return bookingEnd;
  };

  const now = new Date();
  const bookingEnd = getBookingEndTime();

  const isCompleted = bookingEnd ? bookingEnd < now : new Date(booking.date) < now;
  const isUpcoming = !isCompleted;

  const handleCancel = (e) => {
    e.stopPropagation();
    setShowCancelModal(true);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const confirmCancel = () => {
    setShowCancelModal(false);
    onCancel(booking.id);
  };

  const confirmDelete = () => {
    setShowDeleteModal(false);
    onDelete(booking.id);
  };

  const formatTimeSlot = (slot) => {
    if (!slot) return "";
    if (typeof slot === "string") return slot;
    return `${slot.label} (${slot.start} - ${slot.end})`;
  };

  return (
    <>
      <div className="group bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100 pb-2 relative">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-xl text-gray-900">{booking.spaceName}</h3>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isCompleted ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}`}>
                  {isCompleted ? "Completed" : "Upcoming"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr] gap-3 mb-4 text-gray-700">
              <div className="flex items-center">
                <span>Date: {booking.date}</span>
              </div>
              <div className="flex items-center">
                <span>Time: {formatTimeSlot(booking.timeSlot)}</span>
              </div>
              <div className="flex items-center font-bold text-blue-600">
                <span>₱{booking.price}</span>
              </div>
              <div className="flex items-center">
                <span>{booking.location}</span>
              </div>
            </div>

            {booking.notes && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="text-sm text-gray-600"><span className="font-medium">Note: </span>{booking.notes}</p>
              </div>
            )}
          </div>

          {(isUpcoming || isCompleted) && (
            <div className="flex md:flex-col justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 ml-5">
              {isUpcoming && (
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium"
                >
                  Cancel Booking
                </button>
              )}

              {isCompleted && (
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex md:flex-col justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 ml-5">
                  <button
                    onClick={handleDelete}
                    disabled={deletingId === booking.id}
                    className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === booking.id ? "Deleting..." : "Delete Booking"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Cancel Modal */}
      <ConfirmModal
        show={showCancelModal}
        onConfirm={confirmCancel}
        onCancel={() => setShowCancelModal(false)}
        message="Are you sure you want to cancel this booking?"
        title="Cancel Booking"
      />

      {/* Delete Modal */}
      <ConfirmModal
        show={showDeleteModal}
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteModal(false)}
        message="Are you sure you want to delete this completed booking? This action cannot be undone."
        title="Delete Booking"
      />
    </>
  );
}