import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useBookings } from "../contexts/BookingContext.jsx";

import SpaceInfo from "../components/SpaceDetail/SpaceInfo";
import BookingForm from "../components/SpaceDetail/BookingForm";

// Map amenities to emojis
const getAmenityEmoji = (amenity) => {
  const emojiMap = { wifi:"📶", pods:"🎧", nap:"😴", coffee:"☕", pantry:"🍽️", whiteboard:"📋", lockers:"🗄️", safety:"🛡️", ac:"❄️", desks:"💻", meeting:"🤝", virtual:"🎥", printing:"🖨️", support:"🛟", gym:"💪", cleaning:"🧹", charging:"🔋", printer:"🖨️", snacks:"🍪", books:"📚", events:"🎉", seating:"💺", power:"⚡", gaming:"🎮", "24/7":"🌙", networking:"👥", ergonomic:"🪑", affordable:"💰", quiet:"🔇", refreshments:"🥤", study:"📖", private:"🔒", lounge:"🛋️" };
  return emojiMap[amenity.toLowerCase()] || "✅";
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

  useEffect(() => { window.scrollTo(0,0); }, []);
  if (!space) return <div className="max-w-4xl mx-auto pt-30 text-center">Space not found</div>;

  const handleBook = (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    addBooking({
      userId: user.id,
      spaceId: space.id,
      spaceName: space.name,
      date: date || new Date().toISOString().slice(0,10),
      timeSlot: selectedSlot,
      price: space.price,
      note: message,
    });
    // alert("Booking confirmed! Go to My Bookings to view.");
    // navigate("/my-bookings");
    return true;
  };

  const handleBack = () => {
    if (location.state?.fromHomePagination) navigate("/", { state: { page: location.state.page } });
    else navigate(-1);
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date(); date.setHours(hour, minute);
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  return (
    <div className="max-w-7xl mx-auto pt-26 px-4 pb-10">
      <button onClick={handleBack} className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6 transition-colors">
        <i className="fas fa-arrow-left mr-2"></i> Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <SpaceInfo space={space} getAmenityEmoji={getAmenityEmoji} />
        </div>

        <div className="lg:w-1/3">
          <BookingForm
            space={space} user={user} date={date} setDate={setDate}
            selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot}
            message={message} setMessage={setMessage}
            handleBook={handleBook} formatTime={formatTime}
          />
        </div>
      </div>
    </div>
  );
}
