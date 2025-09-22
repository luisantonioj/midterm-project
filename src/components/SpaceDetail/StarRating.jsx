import React from "react";

export default function StarRating({ rating, reviews }) {
  return (
    <div className="flex items-center">
      <div className="flex text-amber-400 mr-2">
        {[...Array(5)].map((_, i) => (
          <i key={i} className={`fas fa-star ${i < Math.floor(rating) ? 'text-amber-400' : 'text-slate-300'}`}></i>
        ))}
      </div>
      <span className="text-slate-600 text-sm">{rating} ({reviews} reviews)</span>
    </div>
  );
}
