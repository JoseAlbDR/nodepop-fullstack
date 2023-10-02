import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import StyledLogin from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch';
import { QueryClient } from '@tanstack/react-query';

export const action =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { request } = data;
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData);
    try {
      const {
        data: { msg },
      } = await customFetch.post('/auth/login', loginData);
      queryClient.invalidateQueries();
      toast.success(msg);
      return redirect('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      console.log(error);
      return error;
    }
  };

const Login = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const loginDemoUser = async () => {
    const data = {
      email: 'morfeo@matrix.com',
      password: 'redorbluepill',
    };
    try {
      await customFetch.post('/auth/login', data);
      toast.success('Take a test drive');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      console.log(error);
      throw error;
    }
  };

  return (
    <StyledLogin>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue=""
          disabled={isSubmitting}
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue=""
          disabled={isSubmitting}
        />
        <SubmitBtn />
        <button
          type="button"
          className="btn btn-block"
          disabled={isSubmitting}
          onClick={loginDemoUser}
        >
          explore the app
        </button>
        <p>
          Not a member yet?<Link to="/register">Register</Link>
        </p>
      </Form>
    </StyledLogin>
  );
};
export default Login;
