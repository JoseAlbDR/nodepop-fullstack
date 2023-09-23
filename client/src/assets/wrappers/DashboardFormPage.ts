import styled from 'styled-components';

const Wrapper = styled.section`
  .dashboard-page {
    background: var(--background-secondary-color);
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
  }
  h4 {
    margin-bottom: 2rem;
  }

  .form-center {
    display: grid;
    align-items: center;
    gap: 1rem;
  }

  .form-row {
    margin-bottom: 0;
  }

  .form-btn {
    align-self: end;
    height: 35px;
  }

  @media (width > 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }

    @media (width > 1120px) {
      .form-center {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
`;

export default Wrapper;