import React from 'react';
import { Link } from 'react-router-dom';

export default function SpaceCard({ space }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={space.main_image} 
        alt={space.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{space.name}</h3>
        <p className="text-gray-600 mb-2">{space.location}</p>
        <p className="text-blue-600 font-bold mb-4">₱{space.price} / session</p>
        <p className="text-gray-700 mb-4 line-clamp-2">{space.description}</p>
        <Link 
          to={`/space/${space.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-block"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}