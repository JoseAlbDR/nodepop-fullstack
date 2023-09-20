import React, { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';

interface DashboardContextValues {
  user: { name: string };
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
);

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const user = { name: 'Yusep' };

  const toggleDarkTheme = () => {
    const ligthTheme = !isDarkTheme;
    setIsDarkTheme(ligthTheme);
    console.log(isDarkTheme);

    localStorage.setItem('darkTheme', ligthTheme + '');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    console.log('logout user');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

function useDashboard() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error('Dashboard context was used outside of DashboardProvider');
  }
  return context;
}

export { DashboardProvider, useDashboard };
