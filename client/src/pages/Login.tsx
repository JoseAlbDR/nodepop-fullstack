import { ActionFunctionArgs, Form, Link, redirect } from 'react-router-dom';
import StyledLogin from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const loginData = Object.fromEntries(formData);

  try {
    const {
      data: { msg },
    } = await customFetch.post('/auth/login', loginData);
    toast.success(msg);
    return redirect('/');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error.response!.data.msg!);
    }
    console.log(error);
    return error;
  }
};

const Login = () => {
  return (
    <StyledLogin>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="jaderodev@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="M5e5k5i57."
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <button type="submit" className="btn btn-block">
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
