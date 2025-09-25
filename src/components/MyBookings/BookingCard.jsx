import React, { useState, useMemo } from "react";
import ConfirmModal from "./ConfirmModal";

export default function BookingsList({ bookings, onCancel, onDelete, deletingId }) {
  const [dateSort, setDateSort] = useState("asc"); // "asc" | "desc"

  // Group and sort bookings by date
  const groupedBookings = useMemo(() => {
    const grouped = {};
    
    bookings.forEach(booking => {
      if (!grouped[booking.date]) {
        grouped[booking.date] = [];
      }
      grouped[booking.date].push(booking);
    });

    // Sort dates and bookings within each date
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      return dateSort === "asc" 
        ? new Date(a) - new Date(b)
        : new Date(b) - new Date(a);
    });

    // Sort bookings within each date by time
    sortedDates.forEach(date => {
      grouped[date].sort((a, b) => {
        const timeA = a.timeSlot?.start || "";
        const timeB = b.timeSlot?.start || "";
        return timeA.localeCompare(timeB);
      });
    });

    return sortedDates.map(date => ({
      date,
      bookings: grouped[date]
    }));
  }, [bookings, dateSort]);

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          My Bookings ({bookings.length})
        </h2>
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Sort by date:</label>
          <select 
            value={dateSort}
            onChange={(e) => setDateSort(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="asc">Ascending (Oldest first)</option>
            <option value="desc">Descending (Newest first)</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {groupedBookings.map(({ date, bookings: dateBookings }) => (
          <DateGroup key={date} date={date} bookings={dateBookings} 
            onCancel={onCancel} onDelete={onDelete} deletingId={deletingId} />
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      )}
    </div>
  );
}

// Individual booking card (minimal changes from original)
function BookingCard({ booking, onCancel, onDelete, deletingId }) {
  const [modal, setModal] = useState(null);

  const parseDateTime = (date, time) => new Date(`${date} ${time}`);

  const getBookingEndTime = () => {
    if (!booking.date || !booking.timeSlot) return null;
    const { start, end } = booking.timeSlot;
    const startDate = parseDateTime(booking.date, start);
    let endDate = parseDateTime(booking.date, end);

    if (endDate <= startDate) endDate.setDate(endDate.getDate() + 1);
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

  const confirm = () => {
    if (modal === "cancel") onCancel(booking.id);
    if (modal === "delete") onDelete(booking.id);
    setModal(null);
  };

  return (
    <>
      <div className="group bg-white rounded-lg shadow-sm p-5 transition-all hover:shadow-md border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-lg text-gray-900">{booking.spaceName}</h3>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    isCompleted ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {isCompleted ? "Completed" : "Upcoming"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr] gap-3 mb-3 text-gray-700 text-sm">
              <div>{formatTimeSlot(booking.timeSlot)}</div>
              <div className="font-bold text-blue-600">₱{booking.price}</div>
              <div>{booking.location}</div>
            </div>

            {booking.notes && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Note: </span>
                  {booking.notes}
                </p>
              </div>
            )}
          </div>

          <div className="flex md:flex-col justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0 md:ml-4">
            {isUpcoming && (
              <button
                onClick={() => setModal("cancel")}
                className="px-3 py-1.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium"
              >
                Cancel
              </button>
            )}

            {isCompleted && (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => setModal("delete")}
                  disabled={deletingId === booking.id}
                  className="px-3 py-1.5 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deletingId === booking.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ConfirmModal
        show={!!modal}
        onConfirm={confirm}
        onCancel={() => setModal(null)}
        title={modal === "cancel" ? "Cancel Booking" : "Delete Booking"}
        message={
          <>
            <p className="mb-4">
              {modal === "cancel"
                ? "Are you sure you want to cancel this booking?"
                : "Are you sure you want to delete this completed booking? This action cannot be undone."}
            </p>
            <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-1">
              <p className="font-bold text-lg text-gray-900">{booking.spaceName}</p>
              <p><span className="font-semibold">Date:</span> {booking.date}</p>
              <p><span className="font-semibold">Time:</span> {formatTimeSlot(booking.timeSlot)}</p>
              <p><span className="font-semibold">Location:</span> {booking.location}</p>
              <p><span className="font-semibold">Price:</span> ₱{booking.price}</p>
              {booking.notes && (
                <p><span className="font-semibold">Note:</span> {booking.notes}</p>
              )}
            </div>
          </>
        }
      />
    </>
  );
}

// Date group component
function DateGroup({ date, bookings, onCancel, onDelete, deletingId }) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="bg-gray-50 rounded-lg p-1">
      <div className="sticky top-0 bg-gray-100 px-4 py-3 rounded-t-lg">
        <h3 className="font-semibold text-gray-700">{formattedDate}</h3>
        <p className="text-xs text-gray-500 mt-1">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="space-y-3 p-3">
        {bookings.map(booking => (
          <BookingCard 
            key={booking.id} 
            booking={booking} 
            onCancel={onCancel} 
            onDelete={onDelete} 
            deletingId={deletingId} 
          />
        ))}
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import ConfirmModal from "./ConfirmModal";

// export default function BookingCard({ booking, onCancel, onDelete, deletingId }) {
//   const [modal, setModal] = useState(null); // "cancel" | "delete" | null

//   // --- Utilities ---
//   const parseDateTime = (date, time) => new Date(`${date} ${time}`);

//   const getBookingEndTime = () => {
//     if (!booking.date || !booking.timeSlot) return null;
//     const { start, end } = booking.timeSlot;
//     const startDate = parseDateTime(booking.date, start);
//     let endDate = parseDateTime(booking.date, end);

//     // Handle overnight (end < start → next day)
//     if (endDate <= startDate) endDate.setDate(endDate.getDate() + 1);
//     return endDate;
//   };

//   const formatTime = (timeStr) =>
//     timeStr
//       ? new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], {
//           hour: "numeric",
//           minute: "2-digit",
//           hour12: true,
//         })
//       : "";

//   const formatTimeSlot = (slot) =>
//     !slot
//       ? ""
//       : typeof slot === "string"
//       ? slot
//       : `${slot.label} (${formatTime(slot.start)} - ${formatTime(slot.end)})`;

//   // --- Status ---
//   const bookingEnd = getBookingEndTime();
//   const isCompleted = bookingEnd ? bookingEnd < new Date() : new Date(booking.date) < new Date();
//   const isUpcoming = !isCompleted;

//   // --- Handlers ---
//   const confirm = () => {
//     if (modal === "cancel") onCancel(booking.id);
//     if (modal === "delete") onDelete(booking.id);
//     setModal(null);
//   };

//   return (
//     <>
//       <div className="group bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100 pb-2 relative">
//         <div className="flex flex-col md:flex-row justify-between">
//           <div className="flex-1">
//             {/* Header */}
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
//               <div className="flex items-center gap-3">
//                 <h3 className="font-bold text-xl text-gray-900">{booking.spaceName}</h3>
//                 <span
//                   className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                     isCompleted ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"
//                   }`}
//                 >
//                   {isCompleted ? "Completed" : "Upcoming"}
//                 </span>
//               </div>
//             </div>

//             {/* Details */}
//             <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr_1fr_1fr] gap-3 mb-4 text-gray-700">
//               <div>{booking.date}</div>
//               <div>{formatTimeSlot(booking.timeSlot)}</div>
//               <div className="font-bold text-blue-600">₱{booking.price}</div>
//               <div>{booking.location}</div>
//             </div>

//             {booking.notes && (
//               <div className="bg-gray-50 p-3 rounded-lg mb-4">
//                 <p className="text-sm text-gray-600">
//                   <span className="font-medium">Note: </span>
//                   {booking.notes}
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex md:flex-col justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 ml-5">
//             {isUpcoming && (
//               <button
//                 onClick={() => setModal("cancel")}
//                 className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium"
//               >
//                 Cancel Booking
//               </button>
//             )}

//             {isCompleted && (
//               <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                 <button
//                   onClick={() => setModal("delete")}
//                   disabled={deletingId === booking.id}
//                   className="px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 hover:text-red-600 hover:border-red-300 transition-all focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {deletingId === booking.id ? "Deleting..." : "Delete Booking"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Shared Modal */}
//       <ConfirmModal
//         show={!!modal}
//         onConfirm={confirm}
//         onCancel={() => setModal(null)}
//         title={modal === "cancel" ? "Cancel Booking" : "Delete Booking"}
//         message={
//           <>
//             <p className="mb-4">
//               {modal === "cancel"
//                 ? "Are you sure you want to cancel this booking?"
//                 : "Are you sure you want to delete this completed booking? This action cannot be undone."}
//             </p>
//             <div className="bg-gray-50 border rounded-lg p-4 text-sm text-gray-700 space-y-1">
//               <p className="font-bold text-lg text-gray-900">{booking.spaceName}</p>
//               <p><span className="font-semibold">Date:</span> {booking.date}</p>
//               <p><span className="font-semibold">Time:</span> {formatTimeSlot(booking.timeSlot)}</p>
//               <p><span className="font-semibold">Location:</span> {booking.location}</p>
//               <p><span className="font-semibold">Price:</span> ₱{booking.price}</p>
//               {booking.notes && (
//                 <p><span className="font-semibold">Note:</span> {booking.notes}</p>
//               )}
//             </div>
//           </>
//         }
//       />
//     </>
//   );
// }