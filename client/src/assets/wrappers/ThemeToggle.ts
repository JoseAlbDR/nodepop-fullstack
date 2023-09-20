import styled from 'styled-components';

const Wrapper = styled.button`
  border-color: transparent;
  background: transparent;
  font-size: 1.5rem;
  display: grid;
  place-items: center;
  cursor: pointer;

  .toggle-icon {
    color: var(--text-color);
  }
`;

export default Wrapper;
