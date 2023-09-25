import styled from 'styled-components';

const Wrapper = styled.div`
  .confirm-form {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 1rem;
    border-radius: var(--border-radius);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: var(--transition);
  }

  .content {
    padding: 2rem 1.5rem;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    background: var(--background-secondary-color);
    width: 20vw;
    border-radius: var(--border-radius);
  }

  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  .buttons {
    display: flex;
    /* flex-direction: column; */
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
`;

export default Wrapper;
