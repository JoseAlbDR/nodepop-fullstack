import {
  ActionFunctionArgs,
  Form,
  Link,
  redirect,
  useNavigation,
} from 'react-router-dom';
import StyledRegister from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';
import customFetch from '../utils/customFetch.ts';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const registerData = Object.fromEntries(formData);
  try {
    await customFetch.post('/auth/register', registerData);
    return redirect('/login');
  } catch (error) {
    console.log(error);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  console.log(navigation);
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
          defaultValue="yusep"
        />
        <FormRow
          type="text"
          name="lastName"
          labelText="last name"
          defaultValue="delgado"
        />
        <FormRow
          type="text"
          name="location"
          labelText="location"
          defaultValue="granada"
        />
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
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? 'submitting...' : 'submit'}
        </button>
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
