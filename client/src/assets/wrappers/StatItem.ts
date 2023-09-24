import styled from 'styled-components';

interface StatItemProps {
  color: string;
  bcg: string;
}

const Wrapper = styled.article<StatItemProps>`
  padding: 2rem;
  background: var(--background-secondary-color);
  border-radius: var(--border-radius);
  border-bottom: 5px solid ${(props) => props.color};

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.color};
  }

  .count {
    display: block;
    font-size: 4rem;
    font-weight: 700;
    line-height: 2;
  }

  .icon {
    background: ${(props) => props.bcg};
    padding: 1rem 1.5rem;
    font-size: 2rem;
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title {
    margin: 0;
    text-align: left;
    letter-spacing: var(--letter-spacing);
    margin-top: 0.5rem;
  }
`;

export default Wrapper;
