import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useBookings } from "../contexts/BookingContext.jsx";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const space = spacesData.find((s) => String(s.id) === String(spaceId));
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const [selectedSlot, setSelectedSlot] = useState(space?.time_slots?.[0] || "");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  if (!space) return <div className="max-w-4xl mx-auto pt-30 text-center">Space not found</div>;

  const handleBook = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    
    addBooking({
      userId: user.id,
      spaceId: space.id,
      spaceName: space.name,
      date: date || new Date().toISOString().slice(0,10),
      timeSlot: selectedSlot,
      price: space.price,
      note: message,
    });
    
    alert("Booking confirmed! Go to My Bookings to view.");
    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="max-w-4xl mx-auto pt-20 px-4">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <img 
          src={space.main_image} 
          alt={space.name} 
          className="w-full h-72 md:h-80 object-cover" 
        />
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-800">{space.name}</h2>
              <p className="text-slate-600 mt-1">{space.location}</p>
            </div>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              ₱{space.price}/hour
            </span>
          </div>

          <p className="text-slate-700 leading-relaxed mb-6">{space.description}</p>

          <div className="mb-6">
            <h3 className="font-semibold text-lg text-slate-800 mb-3">Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {space.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center bg-slate-50 px-3 py-2 rounded-lg">
                  <i className="fas fa-check text-green-500 mr-2 text-sm"></i>
                  <span className="text-sm text-slate-700">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleBook} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time slot</label>
                <select 
                  value={selectedSlot} 
                  onChange={e => setSelectedSlot(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {space.time_slots.map((time, i) => (
                    <option key={i} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Special Requests (optional)</label>
              <textarea 
                value={message} 
                onChange={e => setMessage(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                rows={3}
                placeholder="Any special requirements or notes..."
              />
            </div>

            <div className="pt-4 border-t border-slate-200">
              {!user && (
                <p className="text-sm text-amber-600 mb-4">
                  <i className="fas fa-info-circle mr-1"></i>
                  Please log in to book. You'll be redirected to login.
                </p>
              )}
              <button 
                type="submit" 
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {user ? "Book Now" : "Login to Book"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}