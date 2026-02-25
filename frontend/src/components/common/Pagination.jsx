import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const maxDisplayed = 7; // max number of numeric page buttons to display (including current)

  const buildPages = () => {
    if (totalPages <= maxDisplayed) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const side = Math.floor((maxDisplayed - 3) / 2); // pages around current
    let start = Math.max(2, currentPage - side);
    let end = Math.min(totalPages - 1, currentPage + side);

    // adjust when near start or end
    if (currentPage - 1 <= side) {
      start = 2;
      end = maxDisplayed - 2;
    }
    if (totalPages - currentPage <= side) {
      start = totalPages - (maxDisplayed - 3);
      end = totalPages - 1;
    }

    pages.push(1);
    if (start > 2) pages.push('left-ellipsis');
    for (let p = start; p <= end; p++) pages.push(p);
    if (end < totalPages - 1) pages.push('right-ellipsis');
    pages.push(totalPages);

    return pages;
  };

  const pages = buildPages();

  return (
    <nav aria-label="Page navigation" className="mt-4">
      <ul className="pagination justify-content-end">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>

        {pages.map((p, idx) => {
          if (p === 'left-ellipsis' || p === 'right-ellipsis') {
            return (
              <li key={p + idx} className="page-item disabled">
                <span className="page-link">…</span>
              </li>
            );
          }

          return (
            <li key={p} className={`page-item ${currentPage === p ? 'active' : ''}`}>
              <button
                className="page-link"
                onClick={() => onPageChange(p)}
              >
                {p}
              </button>
            </li>
          );
        })}

        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
