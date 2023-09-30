import { FaMoon, FaSun } from 'react-icons/fa';

import StyledThemeToggle from '../assets/wrappers/ThemeToggle';
import { useDarkThemeContext } from '../context/ToggleDarkThemeContext';

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDarkThemeContext();

  return (
    <StyledThemeToggle type="button" onClick={toggleDarkTheme}>
      {isDarkTheme ? <FaSun className="toggle-icon" /> : <FaMoon />}
    </StyledThemeToggle>
  );
};

export default ThemeToggle;
