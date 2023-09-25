import StyledBigSidebar from '../assets/wrappers/BigSidebar';
import { useDashboardContext } from '../context/DashboardContext';
import Logo from './Logo';
import NavLinks from './NavLinks';
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <StyledBigSidebar>
      <div
        className={
          showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </StyledBigSidebar>
  );
};

export default BigSidebar;
