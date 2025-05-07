import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  className = '',
}) => {
  // Generate page numbers to display
  const generatePageNumbers = () => {
    const pages = [];
    const totalNumbers = siblingCount * 2 + 3; // Total number of page items to show
    const totalBlockCount = totalNumbers + 2; // With first and last pages

    // If total pages are less than total block count, just show all pages
    if (totalPages <= totalBlockCount) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(
        currentPage + siblingCount,
        totalPages
      );

      // Show dots when pages exceed the number we want to display
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

      // Always show first page
      pages.push(1);

      // Handle left dots
      if (shouldShowLeftDots) {
        pages.push('...');
      } else if (!shouldShowLeftDots && leftSiblingIndex > 1) {
        pages.push(2);
      }

      // Handle middle pages
      for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      // Handle right dots
      if (shouldShowRightDots) {
        pages.push('...');
      } else if (!shouldShowRightDots && rightSiblingIndex < totalPages) {
        pages.push(totalPages - 1);
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <div className={`flex justify-center items-center gap-2 mt-6 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-purple-900/30 text-amber-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-800/50 transition-colors"
      >
        Previous
      </button>

      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => (typeof page === 'number' ? onPageChange(page) : null)}
          className={`w-9 h-9 flex items-center justify-center rounded-md ${
            page === currentPage
              ? 'bg-amber-600 text-[#1e0d24] font-medium'
              : page === '...'
              ? 'bg-transparent cursor-default'
              : 'bg-purple-900/30 text-amber-100 hover:bg-purple-800/50'
          } transition-colors`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-md bg-purple-900/30 text-amber-100 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-purple-800/50 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
