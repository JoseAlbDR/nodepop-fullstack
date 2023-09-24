import styled from 'styled-components';

const Wrapper = styled.section`
  display: grid;
  row-gap: 2rem;

  @media (width > 768px) {
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
  }

  @media (width > 1120px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default Wrapper;
