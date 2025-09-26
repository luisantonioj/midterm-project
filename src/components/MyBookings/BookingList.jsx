import React, { useState } from "react";
import BookingCard from "./BookingCard";
import ConfirmModal from "./ConfirmModal";

export default function BookingList({ bookings, isLoading, onCancel, onDelete, deletingId }) {
  const [asc, setAsc] = useState(true);
  const [modalData, setModalData] = useState(null); 
  // { type: "cancel" | "delete", booking }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
        <p className="text-gray-500">Your upcoming bookings will appear here</p>
      </div>
    );
  }

  const sorted = [...bookings].sort((a, b) => {
    const d1 = new Date(`${a.date} ${a.timeSlot?.start || "00:00"}`);
    const d2 = new Date(`${b.date} ${b.timeSlot?.start || "00:00"}`);
    return asc ? d1 - d2 : d2 - d1;
  });

  const now = new Date();
  const upcoming = sorted.filter((b) => {
    const end = b.timeSlot?.end ? new Date(`${b.date} ${b.timeSlot.end}`) : new Date(b.date);
    return end >= now;
  });
  const completed = sorted.filter((b) => !upcoming.includes(b));

  const handleConfirm = () => {
    if (modalData?.type === "cancel") onCancel(modalData.booking.id);
    if (modalData?.type === "delete") onDelete(modalData.booking.id);
    setModalData(null);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Label + Sort Toggle */}
        <div className="flex justify-between items-center mb-1">
          <h2 className="font-semibold text-gray-800">Bookings (Sorted by Date)</h2>
          <button
            onClick={() => setAsc(!asc)}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium 
                      bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition"
          >
            {asc ? "Newest first" : "Oldest first"}
            <span className="text-xs">{asc ? "↑" : "↓"}</span>
          </button>
        </div>

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <section>
            <div className="flex items-center mb-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-lg font-semibold text-indigo-700">Upcoming</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="space-y-4">
              {upcoming.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  deletingId={deletingId}
                  onOpenModal={(type, booking) => setModalData({ type, booking })}
                />
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section>
            <div className="flex items-center mb-3">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="px-3 text-lg font-semibold text-gray-700">Completed</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <div className="space-y-4 opacity-90">
              {completed.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  deletingId={deletingId}
                  onOpenModal={(type, booking) => setModalData({ type, booking })}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      {/* Shared Modal */}
      <ConfirmModal
        show={!!modalData}
        onConfirm={handleConfirm}
        onCancel={() => setModalData(null)}
        title={modalData?.type === "cancel" ? "Cancel Booking" : "Delete Booking"}
        message={
          modalData && (
            <>
              <p className="mb-4">
                {modalData.type === "cancel"
                  ? "Are you sure you want to cancel this booking?"
                  : "Are you sure you want to delete this completed booking? This action cannot be undone."}
              </p>
              <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-1">
                <p className="font-bold text-lg text-gray-900">{modalData.booking.spaceName}</p>
                <p><span className="font-semibold">Date:</span> {modalData.booking.date}</p>
                <p><span className="font-semibold">Location:</span> {modalData.booking.location}</p>
                <p><span className="font-semibold">Price:</span> ₱{modalData.booking.price}.00</p>
                {modalData.booking.notes && (
                  <p><span className="font-semibold">Note:</span> {modalData.booking.notes}</p>
                )}
              </div>
            </>
          )
        }
      />
    </>
  );
}
