import React, { useState, useEffect } from "react";
import SpaceCard from "../../components/Home/SpaceCard";

export default function SpacesGrid({ spaces }) {
  const [currentPage, setCurrentPage] = useState(
    () => Number(localStorage.getItem("currentPage")) || 1
  );
  const itemsPerPage = 6; 

  useEffect(() => {
    if (spaces.length === 0) {
      setCurrentPage(1);
      localStorage.setItem("currentPage", 1);
    }
  }, [spaces.length]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page);

    setTimeout(() => {
      const element = document.getElementById("spaces-grid-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: 'start' });
      }
    }, 50);
  };

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

  // Calculate pagination values
  const totalPages = Math.ceil(spaces.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSpaces = spaces.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div id="spaces-grid-section">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentSpaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            // Show limited page numbers with ellipsis
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === page
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (page === currentPage - 2 || page === currentPage + 2) {
              return <span key={page} className="px-2 text-slate-500">...</span>;
            }
            return null;
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}