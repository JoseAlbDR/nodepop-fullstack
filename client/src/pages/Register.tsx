import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from 'react-router-dom';
import StyledRegister from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, SubmitBtn } from '../components';
import customFetch from '../utils/customFetch.ts';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);
  try {
    const {
      data: { msg },
    } = await customFetch.post('/auth/register', registerData);
    console.log(msg);
    toast.success(msg);
    return redirect('/login');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <StyledRegister>
      <Form method="post" className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow
          type="text"
          name="name"
          labelText="name"
          defaultValue="Jose Alberto"
          disabled={isSubmitting}
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="Delgado Robles"
          disabled={isSubmitting}
        />
        <FormRow
          type="text"
          name="location"
          labelText="location"
          defaultValue="Granada"
          disabled={isSubmitting}
        />
        <FormRow
          type="email"
          name="email"
          labelText="email"
          defaultValue="jaderodev@gmail.com"
          disabled={isSubmitting}
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="M5e5k5i57."
          disabled={isSubmitting}
        />
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </StyledRegister>
  );
};
export default Register;
