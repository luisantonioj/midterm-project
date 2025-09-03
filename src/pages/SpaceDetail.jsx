import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json"; // :contentReference[oaicite:4]{index=4}
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

  if (!space) return <div>Space not found</div>;

  const handleBook = (e) => {
    e.preventDefault();
    if (!user) {
      // redirect to login — simulated flow
      navigate("/login");
      return;
    }
    // basic form. In real app validate fields.
    addBooking({
      userId: user.id,
      spaceId: space.id,
      spaceName: space.name,
      date: date || new Date().toISOString().slice(0,10),
      timeSlot: selectedSlot,
      price: space.price,
      note: message,
    });
    // simple confirm and navigate to dashboard
    alert("Booking confirmed! Go to My Bookings to view.");
    navigate("/dashboard/my-bookings");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded shadow">
        <img src={space.main_image} alt={space.name} className="w-full h-64 object-cover rounded" />
        <h2 className="mt-4 text-2xl font-semibold">{space.name}</h2>
        <p className="text-sm text-gray-600">{space.location} • ₱{space.price}</p>
        <p className="mt-3">{space.description}</p>

        <div className="mt-4">
          <h3 className="font-medium">Amenities</h3>
          <ul className="list-disc ml-5 text-sm">
            {space.amenities.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </div>

        <form onSubmit={handleBook} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
                   className="w-full border px-2 py-1 rounded" />
          </div>

          <div>
            <label className="block text-sm">Time slot</label>
            <select value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)}
                    className="w-full border px-2 py-1 rounded">
              {space.time_slots.map((t, i) => <option key={i} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm">Message (optional)</label>
            <textarea value={message} onChange={e => setMessage(e.target.value)}
                      className="w-full border px-2 py-1 rounded" rows={3}/>
          </div>

          <div className="md:col-span-2 flex justify-between items-center">
            {!user && <p className="text-sm text-red-500">Please log in to book. Clicking book will redirect you to login.</p>}
            <button type="submit" className="ml-auto px-4 py-2 bg-green-600 text-white rounded">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}
