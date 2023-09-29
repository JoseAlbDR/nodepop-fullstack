import { useSearchParams } from 'react-router-dom';
import StyledPageBtnContainer from '../assets/wrappers/PageBtnContainer';
import { useProductsContext } from '../context/ProductsContext';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useProductsContext();

  const pages = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const [searchParams, setSearchParams] = useSearchParams();
  const handlePageChange = (pageNumber: number) => {
    searchParams.set('page', String(pageNumber));
    setSearchParams(searchParams);
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
      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn page-btn ${
                pageNumber === currentPage ? 'active' : ''
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
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
