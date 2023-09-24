import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;

  svg {
    color: var(--text-secondary-color);
  }

  .product-icon {
    font-size: 1rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
  }

  .product-text {
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
  }
`;

export default Wrapper;
