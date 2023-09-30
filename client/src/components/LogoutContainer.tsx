import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClickAwayListener } from '@mui/material';

import { useDashboardContext } from '../context/DashboardContext';
import StyledLogout from '../assets/wrappers/Logout';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser, editProfile } = useDashboardContext();
  const navigate = useNavigate();

  const avatar = (
    <img src={user.avatar} alt={`${user.name} avatar`} className="img" />
  );

  return (
    <ClickAwayListener onClickAway={() => setShowLogout(!showLogout)}>
      <StyledLogout>
        <button
          type="button"
          className="btn logout-btn"
          onClick={() => setShowLogout(!showLogout)}
        >
          {user.avatar ? avatar : <BsFillPersonFill />}
          {user.name}
          <IoIosArrowDown />
        </button>

        <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
          <button
            type="button"
            className="dropdown-btn"
            onClick={() => {
              setShowLogout(!showLogout);
              editProfile(navigate);
            }}
          >
            edit profile
          </button>
          <button
            type="button"
            className="dropdown-btn"
            onClick={() => logoutUser(navigate)}
          >
            logout
          </button>
        </div>
      </StyledLogout>
    </ClickAwayListener>
  );
};

export default LogoutContainer;
