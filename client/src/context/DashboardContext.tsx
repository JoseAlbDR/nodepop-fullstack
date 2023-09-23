import React, { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { redirect } from 'react-router-dom';

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
    try {
      const {
        data: { msg },
      } = await customFetch('/auth/logout');
      toast.success(msg);
      redirect('/');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      throw error;
    }
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
