import React, { createContext, useContext, useState } from 'react';
import { checkDefaultTheme } from '../App';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { NavigateFunction, useLoaderData } from 'react-router-dom';
import { IUser, IUserData } from '../types/UserInterface';

interface DashboardContextValues {
  user: IUser;
  showSidebar: boolean;
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
  toggleSidebar: () => void;
  logoutUser: (navigate: NavigateFunction) => Promise<void>;
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
);

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme());
  const { user } = useLoaderData() as IUserData;

  const toggleDarkTheme = () => {
    const ligthTheme = !isDarkTheme;
    setIsDarkTheme(ligthTheme);
    console.log(isDarkTheme);

    localStorage.setItem('darkTheme', ligthTheme + '');
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async (navigate: NavigateFunction) => {
    try {
      const {
        data: { msg },
      } = await customFetch('/auth/logout');
      toast.success(msg);
      navigate('/');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      throw error;
    }
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

function useDashboardContext() {
  const context = useContext(DashboardContext);

  if (context === undefined) {
    throw new Error('Dashboard context was used outside of DashboardProvider');
  }
  return context;
}

export { DashboardProvider, useDashboardContext };
