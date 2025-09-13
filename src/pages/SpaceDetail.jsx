import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useBookings } from "../contexts/BookingContext.jsx";

// Function to get emoji for amenity (case-insensitive)
const getAmenityEmoji = (amenity) => {
  const emojiMap = {
    "wifi": "📶",
    "pods": "🎧",
    "nap": "😴",
    "coffee": "☕",
    "pantry": "🍽️",
    "whiteboard": "📋",
    "lockers": "🗄️",
    "safety": "🛡️",
    "ac": "❄️",
    "desks": "💻",
    "meeting": "🤝",
    "virtual": "🎥",
    "printing": "🖨️",
    "support": "🛟",
    "gym": "💪",
    "cleaning": "🧹",
    "charging": "🔋",
    "printer": "🖨️",
    "snacks": "🍪",
    "books": "📚",
    "events": "🎉",
    "seating": "💺",
    "power": "⚡",
    "gaming": "🎮",
    "24/7": "🌙",
    "networking": "👥",
    "ergonomic": "🪑",
    "affordable": "💰",
    "quiet": "🔇",
    "refreshments": "🥤",
    "study": "📖",
    "private": "🔒",
    "lounge": "🛋️"
  };

  const lowerAmenity = amenity.toLowerCase();
  return emojiMap[lowerAmenity] || "✅";
};

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const space = spacesData.find((s) => String(s.id) === String(spaceId));
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const [selectedSlot, setSelectedSlot] = useState(space?.time_slots?.[0] || "");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

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
    navigate("/my-bookings");
  };

  const handleBack = () => {
    if (location.state?.fromHomePagination) {
      navigate("/", { state: { page: location.state.page } });
    } else {
      navigate(-1);
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="max-w-7xl mx-auto pt-26 px-4 pb-10">
      <button 
        onClick={handleBack} 
        className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors"
      >
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Space Details Section (Scrollable) */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <img 
              src={space.main_image} 
              alt={space.name} 
              className="w-full h-72 md:h-96 object-cover" 
            />
            
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{space.name}</h1>
                <div className="flex items-center text-slate-600 mb-2">
                  <i className="fas fa-map-marker-alt mr-2 text-indigo-500"></i>
                  <span>{space.location}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex text-amber-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className={`fas fa-star ${i < Math.floor(space.rating) ? 'text-amber-400' : 'text-slate-300'}`}></i>
                    ))}
                  </div>
                  <span className="text-slate-600 text-sm">{space.rating} ({space.reviews} reviews)</span>
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed mb-8 text-lg">{space.description}</p>

              <div className="mb-8">
                <h3 className="font-semibold text-xl text-slate-800 mb-4">Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {space.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center bg-slate-50 px-4 py-3 rounded-lg">
                      <span className="text-xl mr-3">{getAmenityEmoji(amenity)}</span>
                      <span className="text-slate-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Section (Fixed) */}
        <div className="lg:w-1/3">
          <div className="sticky top-28 bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-indigo-700 mb-2">₱{space.price}</div>
              <div className="text-slate-600">per hour</div>
            </div>

            <form onSubmit={handleBook} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  min={new Date().toLocaleDateString('en-CA')} // Prevent past dates
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
                    Please log in to book
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
        </div>
      </div>
    </div>
  );
}