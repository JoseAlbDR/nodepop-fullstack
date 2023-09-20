import { NavLink } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import links from '../utils/links';
const NavLinks = ({ isBigSidebar }: { isBigSidebar: boolean }) => {
  const { toggleSidebar } = useDashboard();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        return (
          <NavLink
            to={path}
            key={text}
            className={'nav-link'}
            onClick={isBigSidebar ? undefined : toggleSidebar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
