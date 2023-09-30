import { Link, useRouteError } from 'react-router-dom';

import { getError } from '../utils/getError';
import StyledErrorPage from '../assets/wrappers/ErrorPage';
import notFound from '../assets/images/not-found.svg';
import { IError } from '../types/ErrorTypes';

const ErrorPage = () => {
  const error = useRouteError();
  const currError: IError = getError(error);

  if (currError.status && currError.status === 404) {
    return (
      <StyledErrorPage>
        <div>
          <img src={notFound} alt="not found" className="img notfound-img" />
          <h3>Ohh! Page not found</h3>
          <p>we can´t seem to find the page you are looking for</p>
          <Link to="/dashboard">Bring me back Home</Link>
        </div>
      </StyledErrorPage>
    );
  }
  return (
    <StyledErrorPage>
      <div>
        <h3>Something went wrong</h3>
        <p>{currError.msg}</p>
      </div>
    </StyledErrorPage>
  );
};
export default ErrorPage;
