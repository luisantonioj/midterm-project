import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <img src={space.main_image} alt={space.name} className="h-40 w-full object-cover rounded" />
      <h3 className="mt-3 font-semibold">{space.name}</h3>
      <p className="text-sm text-gray-600">{space.location}</p>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-lg font-bold">₱{space.price}</span>
        <Link to={`/space/${space.id}`} className="text-sm text-blue-600 hover:underline">View</Link>
      </div>
    </div>
  );
}
