import { Link } from 'react-router-dom';
import StyledRegister from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';

const Register = () => {
  return (
    <StyledRegister>
      <form className="form">
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
          defaultValue="yusepah@gmail.com"
        />
        <FormRow
          type="password"
          name="password"
          labelText="password"
          defaultValue="mekieros"
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </StyledRegister>
  );
};
export default Register;
