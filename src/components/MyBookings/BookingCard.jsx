import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function BookingCard({ booking, onCancel }) {
  const [showModal, setShowModal] = useState(false);
  
  const handleCancel = () => {
    setShowModal(true);
  };
  
  const confirmCancel = () => {
    onCancel(booking.id);
    setShowModal(false);
  };
  
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex">
          <img 
            src={booking.spaceImage} 
            alt={booking.spaceName} 
            className="w-24 h-24 object-cover rounded"
          />
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold">{booking.spaceName}</h3>
            <p className="text-gray-600">Date: {booking.date}</p>
            {booking.timeSlot && (
              <p className="text-gray-600">
                Time: {booking.timeSlot.label} ({booking.timeSlot.start} - {booking.timeSlot.end})
              </p>
            )}
            <p className="text-blue-600 font-bold">₱{booking.price}</p>
            {booking.notes && (
              <p className="text-gray-600 mt-2">Notes: {booking.notes}</p>
            )}
          </div>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors self-start"
          >
            Cancel
          </button>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmCancel}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking?"
      />
    </>
  );
}