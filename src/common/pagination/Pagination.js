import React, { useState } from "react";
import { Icons } from "../../constant/Icons";
import { Style } from "../styled/Styled";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  onChangeItemsPerPage,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      onPageChange(pageNumber);
    }
  };

  
  const renderPageButtons = () => {
    const pageButtons = [];
  
    // show first page button
    if (currentPage > 1) {
      pageButtons.push(
        <button
          key={1}
          className={`p-3 inactive__page`}
          onClick={() => goToPage(1)}
        >
          {1}
        </button>
      );
    }
  
    // show ellipsis if there are more than 3 pages
    if (totalPages > 3 && currentPage > 2) {
      pageButtons.push(
        <button
          key={'leftEllipsis'}
          className={`p-3 inactive__page`}
          onClick={() => goToPage(currentPage - 2)}
        >
          {'...'}
        </button>
      );
    }
  
    // show up to 3 page buttons before and after current page
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < totalPages) {
        pageButtons.push(
          <button
            key={i}
            className={`px-3 py-2 border ${
              currentPage === i ? 'active__page' : 'inactive__page'
            }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </button>
        );
      }
    }
  
    // show ellipsis if there are more than 3 pages
    if (totalPages > 3 && currentPage < totalPages - 1) {
      pageButtons.push(
        <button
          key={'rightEllipsis'}
          className={`p-3 inactive__page`}
          onClick={() => goToPage(currentPage + 2)}
        >
          {'...'}
        </button>
      );
    }
  
    // show last page button
    if (currentPage < totalPages) {
      pageButtons.push(
        <button
          key={totalPages}
          className={`p-3 inactive__page`}
          onClick={() => goToPage(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
  
    return pageButtons;
  };
  

  return (
    <Style.Wrapper sx="pagination__wrapper">
      <Style.Text>
        <Style.Span> Showing </Style.Span>
        <Style.Select
          sx="paginate__showing"
          value={itemsPerPage}
          onChange={(e) => onChangeItemsPerPage(parseInt(e.target.value))}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </Style.Select>
        <Style.Span> of {totalPages}</Style.Span>
      </Style.Text>

      <Style.Section sx="pagination__wrapper__button">
        <button
          className={`p-3 ${
            currentPage === 1 ? "inactive__button" : "active__button"
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <Icons.PrevIcon />
        </button>
        {renderPageButtons()}
        <button
          className={`p-3 ${
            currentPage === totalPages ? "inactive__button" : "active__button"
          }`}
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          <Icons.NextIcon />
        </button>
      </Style.Section>
    </Style.Wrapper>
  );
};

export default Pagination;
