import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import StyledLogout from '../assets/wrappers/Logout';

const LogoutContainer = () => {
  const [showLogout, setShowLogut] = useState(false);
  const { user, logoutUser } = useDashboard();

  return (
    <StyledLogout>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogut(!showLogout)}
      >
        <BsFillPersonFill />
        {user?.name}
        <IoIosArrowDown />
      </button>
      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button type="button" className="dropdown-btn" onClick={logoutUser}>
          logout
        </button>
      </div>
    </StyledLogout>
  );
};

export default LogoutContainer;
