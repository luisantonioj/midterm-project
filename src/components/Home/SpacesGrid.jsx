import React from "react";
import SpaceCard from "../../components/SpaceCard";

export default function SpacesGrid({ spaces }) {
  if (spaces.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-12 w-12 text-slate-300">😔</div>
        <h3 className="mt-4 text-lg font-medium text-slate-900">
          No spaces found
        </h3>
        <p className="mt-2 text-slate-600">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {spaces.map((space) => (
        <SpaceCard key={space.id} space={space} />
      ))}
    </div>
  );
}
