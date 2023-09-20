import { FaTimes } from 'react-icons/fa';
import StyledSmallSidebar from '../assets/wrappers/SmallSideBar';
import { useDashboard } from '../context/DashboardContext';
import { Logo } from '.';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboard();

  return (
    <StyledSmallSidebar>
      <div
        className={
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </StyledSmallSidebar>
  );
};

export default SmallSidebar;
