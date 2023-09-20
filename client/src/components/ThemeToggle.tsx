import { useDashboard } from '../context/DashboardContext';
import StyledThemeToggle from '../assets/wrappers/ThemeToggle';
import { FaMoon, FaSun } from 'react-icons/fa';
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useDashboard();

  return (
    <StyledThemeToggle type="button" onClick={toggleDarkTheme}>
      {isDarkTheme ? <FaSun className="toggle-icon" /> : <FaMoon />}
    </StyledThemeToggle>
  );
};

export default ThemeToggle;
