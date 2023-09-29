import styled from 'styled-components';

const Wrapper = styled.section`
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem;

  .page-btn {
    font-size: 1.5rem;
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    font-weight: 700;
    width: 50px;
    height: 40px;
  }

  .prev-btn,
  .next-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
    color: var(--primary-300);
    background: var(--background-secondary-color);
    border-color: transparent;
    height: 40px;
    letter-spacing: var(--letter-spacing);
    gap: 0.5rem;
  }

  .prev-btn:hover,
  .next-btn:hover {
    background: var(--primary-500);
    color: var(--white);
  }

  .active {
    background: var(--primary-500);
    color: var(--white);
  }

  .btn-container {
    display: flex;
    background: var(--background-secondary-color);
    border-radius: var(--border-radius);
    display: flex;
  }
`;

export default Wrapper;
