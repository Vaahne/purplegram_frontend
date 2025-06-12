import React, { useState, useEffect } from "react";

const Pagination = ({ data, itemsPerPage, setDisplayedData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    displayPage(currentPage);
  }, [currentPage, data]);

  const displayPage = (page) => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setDisplayedData(data.slice(start, end));
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pageCount) {
      setCurrentPage(page);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        </li>
        {[...Array(pageCount)].map((_, i) => (
          <li key={i} className={`page-item ${i + 1 === currentPage ? "active" : ""}`}>
            <button className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</button>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageCount ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
