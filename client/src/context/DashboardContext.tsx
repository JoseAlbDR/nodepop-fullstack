import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';
import { NavigateFunction, useLoaderData } from 'react-router-dom';
import { IUser, IUserData } from '../types/UserInterface';

interface DashboardContextValues {
  user: IUser;
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: (navigate: NavigateFunction) => Promise<void>;
  editProfile: (navigate: NavigateFunction) => void;
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
);

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useLoaderData() as IUserData;

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

  const editProfile = (navigate: NavigateFunction) => {
    navigate('/dashboard/profile');
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
        editProfile,
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
