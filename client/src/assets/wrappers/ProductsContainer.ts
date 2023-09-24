import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  margin: 0 auto;
  margin-top: 4rem;

  h2 {
    text-transform: none;
  }

  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .products {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }

  @media (width > 768px) {
    .products {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (width > 992px) {
    width: 90%;
  }

  @media (width > 1120px) {
    .products {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }

  @media (width > 1280px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (width > 1920px) {
    .products {
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default Wrapper;
