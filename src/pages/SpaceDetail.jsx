import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../components/BookingForm';
import spacesData from '../data/spaces.json';

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const space = spacesData.find(s => s.id === parseInt(spaceId));
  
  if (!space) {
    return <div className="container mx-auto px-4 py-8">Space not found.</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img 
            src={space.main_image} 
            alt={space.name} 
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          <div className="grid grid-cols-2 gap-4 mb-4">
            {space.images.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`${space.name} ${index + 1}`} 
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{space.name}</h1>
          <p className="text-gray-600 mb-4">{space.location}</p>
          <p className="text-blue-600 font-bold text-2xl mb-4">₱{space.price} / session</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{space.description}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Operating Hours</h2>
            <p className="text-gray-700">{space.hours}</p>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Available Time Slots</h2>
            <ul className="list-disc list-inside">
              {space.time_slots.map((slot, index) => (
                <li key={index} className="text-gray-700">{slot}</li>
              ))}
            </ul>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {space.amenities.map((amenity, index) => (
                <li key={index} className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <BookingForm space={space} />
      </div>
    </div>
  );
}