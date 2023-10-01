import { AxiosError } from 'axios';
import { useRouteError } from 'react-router-dom';

const ErrorComponent = () => {
  const error = useRouteError();
  if (error instanceof AxiosError) console.log(error?.response?.data.msg);
  console.log(error);
  return (
    <>
      <h3>There was an error...</h3>
    </>
  );
};

export default ErrorComponent;
