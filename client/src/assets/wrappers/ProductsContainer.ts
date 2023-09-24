import styled from 'styled-components';

const Wrapper = styled.div`
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

  @media (width > 1120px) {
    .products {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;

export default Wrapper;
