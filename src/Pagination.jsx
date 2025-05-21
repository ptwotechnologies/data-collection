import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  // Generate page numbers for display
  const getPageNumbers = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Current page and neighbors
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      if (pages[pages.length - 1] !== i - 1) {
        // Add ellipsis if there's a gap
        pages.push('...');
      }
      pages.push(i);
    }

    // Last page (if not already included)
    if (totalPages > 1) {
      if (pages[pages.length - 1] !== totalPages - 1) {
        pages.push('...');
      }
      if (pages[pages.length - 1] !== totalPages) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={`flex justify-center ${className}`}>
      <div className="flex space-x-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
        >
          First
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
        >
          Prev
        </button>

        {pageNumbers.map((page, index) =>
          page === '...' ? (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1 text-amber-100"
            >
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-amber-600 text-[#1e0d24]'
                  : 'bg-[#2a1533] text-amber-100'
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
        >
          Next
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded bg-[#2a1533] text-amber-100 disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Pagination;
