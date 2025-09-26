import React from "react";

export default function BookingCard({ booking, deletingId, onOpenModal }) {
  const parseDateTime = (date, time) => new Date(`${date} ${time}`);

  const getBookingEndTime = () => {
    if (!booking.date || !booking.timeSlot) return null;
    const { start, end } = booking.timeSlot;
    const startDate = parseDateTime(booking.date, start);
    let endDate = parseDateTime(booking.date, end);
    if (endDate <= startDate) endDate.setDate(endDate.getDate() + 1); // overnight
    return endDate;
  };

  const formatTime = (timeStr) =>
    timeStr
      ? new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : "";

  const formatTimeSlot = (slot) =>
    !slot
      ? ""
      : typeof slot === "string"
      ? slot
      : `${slot.label} (${formatTime(slot.start)} - ${formatTime(slot.end)})`;

  const bookingEnd = getBookingEndTime();
  const isCompleted = bookingEnd ? bookingEnd < new Date() : new Date(booking.date) < new Date();
  const isUpcoming = !isCompleted;

  return (
    <div className="group bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md hover:border-indigo-400 border border-gray-100 pb-2 relative">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
            <h3 className="font-bold text-xl text-gray-900">{booking.spaceName}</h3>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-3 mb-4 text-gray-700 items-center">
            <div>{booking.date}</div>
            <div>{formatTimeSlot(booking.timeSlot)}</div>
            <div className="font-bold text-indigo-600">₱{booking.price}.00</div>
            <div>{booking.location}</div>
          </div>

          {booking.notes && (
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Note: </span>
                {booking.notes}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex md:flex-col items-end md:items-center justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 ml-5">
          {isUpcoming && (
            <button
              onClick={() => onOpenModal("cancel", booking)}
              className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition mt-9 mb-5"
            >
              Cancel Booking
            </button>
          )}

          {isCompleted && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => onOpenModal("delete", booking)}
                disabled={deletingId === booking.id}
                className="px-4 py-2 rounded-full text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition mt-9 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === booking.id ? "Deleting..." : "Delete Booking"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
