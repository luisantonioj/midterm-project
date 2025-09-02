import React, { useState, useEffect } from 'react';
import SpaceCard from '../components/SpaceCard';
import SearchBar from '../components/SearchBar';
import spacesData from '../data/spaces.json';

export default function Home() {
  const [spaces, setSpaces] = useState([]);
  const [filteredSpaces, setFilteredSpaces] = useState([]);
  
  useEffect(() => {
    setSpaces(spacesData);
    setFilteredSpaces(spacesData);
  }, []);
  
  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredSpaces(spaces);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const filtered = spaces.filter(space => 
      space.name.toLowerCase().includes(lowerCaseQuery) || 
      space.location.toLowerCase().includes(lowerCaseQuery)
    );
    
    setFilteredSpaces(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Study Space</h1>
      
      <SearchBar onSearch={handleSearch} />
      
      {filteredSpaces.length === 0 ? (
        <p className="text-center text-gray-600 mt-8">No spaces found matching your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpaces.map(space => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      )}
    </div>
  );
}