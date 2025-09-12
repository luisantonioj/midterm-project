import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import ConfirmModal from "../components/MyBookings/ConfirmModal";
import Login from "./Login";

export default function MyBookings() {
  const { user } = useAuth();
  const { bookings, cancelBooking, isLoading } = useBookings();

  if (!user) {
    return <Login />;
  }

  const myBookings = (Array.isArray(bookings) ? bookings : []).filter((b) => b.userId === user.id);

  const [selectedCancel, setSelectedCancel] = useState(null);

  const handleCancelConfirm = () => {
    cancelBooking(selectedCancel);
    setSelectedCancel(null);
  };

  const formatTimeSlot = (slot) => {
    if (!slot) return "";
    if (typeof slot === "string") return slot;
    return `${slot.label} (${slot.start} - ${slot.end})`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 pt-28">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-2">Manage your upcoming and past bookings</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="animate-pulse">
            <div className="h-16 w-16 mx-auto bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ) : myBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-gray-300 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No bookings yet</h3>
          <p className="text-gray-500">Your upcoming bookings will appear here</p>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Book Now
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myBookings.map((b) => {
            const isCompleted = new Date(b.date) < new Date();
            const isUpcoming = !isCompleted;
            
            return (
              <div key={b.id} className="bg-white rounded-xl shadow-sm p-6 transition-all hover:shadow-md border border-gray-100 pb-2">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-xl text-gray-900">{b.spaceName}</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1fr] gap-3 mb-4">
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{b.date}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{formatTimeSlot(b.timeSlot)}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>₱{b.price}.00</span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${isCompleted ? "bg-gray-100 text-gray-700" : "bg-blue-100 text-blue-700"}`}>
                          {isCompleted ? "Completed" : "Upcoming"}
                        </span>
                      </div>
                    </div>
                    
                    {b.note && (
                      <div className="bg-gray-50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Note: </span>{b.note}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {isUpcoming && (
                    <div className=" flex md:flex-col justify-end md:justify-center space-x-2 md:space-x-0 md:space-y-2 ml-5">
                      <button 
                        onClick={() => setSelectedCancel(b.id)} 
                        className="px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 text-sm font-medium"
                      >
                        Cancel Booking
                      </button>
                    </div>
                  )}

                  {isCompleted && ( <div className="ml-5 mr-33"> </div>  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ConfirmModal
        show={!!selectedCancel}
        onConfirm={handleCancelConfirm}
        onCancel={() => setSelectedCancel(null)}
        message="Are you sure you want to cancel this booking?"
        title="Cancel Booking"
      />
    </div>
  );
}