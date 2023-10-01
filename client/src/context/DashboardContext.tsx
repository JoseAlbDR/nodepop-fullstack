import React, { createContext, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';

import customFetch from '../utils/customFetch';

import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/getCurrentUser';
import { IUser } from '../types/UserInterface';

interface DashboardContextValues {
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: (navigate: NavigateFunction) => Promise<void>;
  editProfile: (navigate: NavigateFunction) => void;
  user: IUser;
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
);

const currentUserQuery = {
  queryKey: ['user'],
  queryFn: getCurrentUser,
};

function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const user = useQuery(currentUserQuery)?.data?.user;
  if (!user) return;
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
