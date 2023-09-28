import StyledNavBar from '../assets/wrappers/NavBar';
import { FaAlignLeft } from 'react-icons/fa';
import LogoutContainer from './LogoutContainer';
import { useDashboardContext } from '../context/DashboardContext';
import { Logo } from '.';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const { toggleSidebar } = useDashboardContext();

  return (
    <StyledNavBar>
      <div className="nav-center">
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <ThemeToggle />
          <LogoutContainer />
        </div>
      </div>
    </StyledNavBar>
  );
};
export default NavBar;
