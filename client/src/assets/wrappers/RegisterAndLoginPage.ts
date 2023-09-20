import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  align-items: center;
  form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);

    .logo {
      display: block;
      margin: 0 auto;
      margin-bottom: 1.4rem;
    }

    h4 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    .btn {
      margin-top: 1rem;
    }

    p {
      margin-top: 1rem;
      text-align: center;
      letter-spacing: var(--letter-spacing);
    }

    a {
      color: var(--primary-300);
      margin-left: 0.5rem;
    }
  }
`;

export default Wrapper;
