import { Link } from 'react-router-dom';
import StyledLogin from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow } from '../components';

const Login = () => {
  return (
    <StyledLogin>
      <form className="form">
        <Logo />
        <h4>Login</h4>
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
        <button type="submit" className="btn btn-block">
          explore the app
        </button>
        <p>
          Not a member yet?<Link to="/register">Register</Link>
        </p>
      </form>
    </StyledLogin>
  );
};
export default Login;
