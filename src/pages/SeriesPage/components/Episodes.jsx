import React, { useEffect, useState } from "react";
import APIFetch from "../../../utils/APIFetch";
import Category from "../../HomePage/components/Category/Category";

const Episodes = ({ sid }) => {
  const [resp, setResp] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const data = await APIFetch(
        `category?slug_id=${sid}&&offset=${
          (currentPage - 1) * limit
        }&limit=${limit}`
      );
      setResp(data);
      setTotal(data.total);
    };
    fetchData();
  }, [sid, currentPage]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {resp && <Category ctype={1} data={resp} />}

      {totalPages > 1 && (
        <div className="pagination-container">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className={
                currentPage === index + 1
                  ? "pagination-btn active"
                  : "pagination-btn"
              }
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Episodes;
