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
    align-self: end;
    margin-bottom: 0;
  }

  .form-btn {
    align-self: end;
    height: 35px;
  }

  .form-tags {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: var(--border-radius);

    label {
      text-transform: capitalize;
    }
  }

  .input-check {
    margin-right: 0.5rem;
    padding-right: 0.5rem;
  }

  input[type='checkbox'] {
    background-color: green;
  }

  select {
    text-transform: capitalize;
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
