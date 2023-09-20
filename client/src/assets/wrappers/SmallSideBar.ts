import styled from 'styled-components';

const Wrapper = styled.aside`
  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: var(--border-radius);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 999;
    opacity: 1;
    visibility: visible;
  }

  button {
  }

  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: transparent;
    border-color: transparent;
    font-size: 2rem;
    color: var(--red-dark);
    cursor: pointer;
  }

  .nav-links {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    /* gap: 2rem; */
    text-transform: capitalize;
  }

  .nav-link {
    display: flex;
    align-items: center;
    padding: 1rem 0;
    color: var(--text-secondary-color);
    transition: var(--transition);
    font-size: 1.5rem;
  }

  .nav-link:hover {
    color: var(--primary-500);
  }

  .active {
    color: var(--primary-500);
  }

  .icon {
    font-size: 1.5rem;
    display: grid;
    place-items: center;
    margin-right: 1rem;
  }

  @media (width > 992px) {
    display: none;
  }
`;

export default Wrapper;
