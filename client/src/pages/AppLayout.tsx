import { Outlet } from 'react-router-dom';

import { DarkThemeProvider } from '../context/ToggleDarkThemeContext';

const AppLayout = () => {
  return (
    <>
      <DarkThemeProvider>
        <Outlet />
      </DarkThemeProvider>
    </>
  );
};
export default AppLayout;
