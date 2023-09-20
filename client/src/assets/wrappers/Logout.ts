import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  .logout-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
  }

  .img {
    width: 25px;
    height: 25px;
    border-radius: 50%;
  }

  .dropdown {
    position: absolute;
    top: 45px;
    left: 0;
    width: 100%;
    box-shadow: var(--shadow-2);
    text-align: center;
    visibility: hidden;
    border-radius: var(--border-radius);
    background: var(--primary-500);
    transition: var(--transition);
  }

  .show-dropdown {
    visibility: visible;
  }

  .dropdown-btn {
    border-color: transparent;
    background-color: transparent;
    color: var(--white);
    padding: 0.5rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  .dropdown:hover {
    box-shadow: var(--shadow-4);
  }
`;

export default Wrapper;
