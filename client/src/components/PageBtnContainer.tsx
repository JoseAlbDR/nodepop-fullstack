import { useSearchParams } from 'react-router-dom';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';

import StyledPageBtnContainer from '../assets/wrappers/PageBtnContainer';
import { useProductsContext } from '../context/ProductsContext';

const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useProductsContext();

  // const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (pageNumber: number) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
  };

  const addPageButton = ({
    pageNumber,
    activeClass,
  }: {
    pageNumber: number;
    activeClass: boolean;
  }) => {
    return (
      <button
        className={`btn page-btn ${activeClass ? 'active' : ''}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageBtns = [];

    // first page
    pageBtns.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // dots
    if (currentPage > 3) {
      pageBtns.push(
        <span className="page-btn dots" key="dots-1">
          ...
        </span>
      );
    }

    // one before current
    if (currentPage !== 1 && currentPage !== 2) {
      pageBtns.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageBtns.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // one after current
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageBtns.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    if (currentPage < numOfPages - 2) {
      pageBtns.push(
        <span className="page-btn dots" key="dots-2">
          ...
        </span>
      );
    }

    // last page
    pageBtns.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageBtns;
  };

  return (
    <StyledPageBtnContainer>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = numOfPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </StyledPageBtnContainer>
  );
};

export default PageBtnContainer;
