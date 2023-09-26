import styled from 'styled-components';

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }

  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
    margin-bottom: 1.5rem;
  }

  p {
    line-height: 2;
    letter-spacing: var(--letter-spacing);
    color: var(text-secondary-color);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }

  .register-link {
    margin-right: 1rem;
  }

  .main-img {
    /* display: none; */
    max-width: 400px;
  }

  .btn {
    padding: 0.75rem 1rem;
  }

  @media (width > 992px) {
    .page {
      grid-template-columns: 1fr 400px;
    }
  }
`;

export default Wrapper;
