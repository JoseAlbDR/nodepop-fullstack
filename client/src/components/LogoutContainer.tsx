import { BsFillPersonFill } from 'react-icons/bs';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { useDashboardContext } from '../context/DashboardContext';
import StyledLogout from '../assets/wrappers/Logout';
import { useNavigate } from 'react-router-dom';

const LogoutContainer = () => {
  const [showLogout, setShowLogut] = useState(false);
  const { user, logoutUser, editProfile } = useDashboardContext();
  const navigate = useNavigate();

  const avatar = (
    <img src={user.avatar} alt={`${user.name} avatar`} className="img" />
  );

  return (
    <StyledLogout>
      <button
        type="button"
        className="btn logout-btn"
        onClick={() => setShowLogut(!showLogout)}
      >
        {user.avatar ? avatar : <BsFillPersonFill />}
        {user.name}
        <IoIosArrowDown />
      </button>

      <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
        <button
          type="button"
          className="dropdown-btn"
          onClick={() => editProfile(navigate)}
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
  );
};

export default LogoutContainer;
