import { useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
  const error = useRouteError();
  console.log(error);
  return <h3>There was an error...</h3>;
};

export default ErrorComponent;
