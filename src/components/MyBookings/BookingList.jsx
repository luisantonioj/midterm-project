import React, { useState } from "react";
import BookingCard from "./BookingCard";

export default function BookingList({ bookings, isLoading, onCancel, onDelete, deletingId }) {
  const [asc, setAsc] = useState(true);

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

  // Sort by date/time
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

  return (
    <div className="space-y-8">
      {/* Label + Sort Toggle */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-gray-800">Bookings (Sorted by Date)</h2>
        <button
          onClick={() => setAsc(!asc)}
          className="px-3 py-1 border rounded-lg text-sm bg-white hover:bg-gray-50"
        >
          {asc ? "Ascending ↑" : "Descending ↓"}
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
                onCancel={onCancel}
                onDelete={onDelete}
                deletingId={deletingId}
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
                onCancel={onCancel}
                onDelete={onDelete}
                deletingId={deletingId}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
