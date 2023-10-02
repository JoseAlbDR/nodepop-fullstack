import React, { createContext, useContext, useState } from 'react';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';

import customFetch from '../utils/customFetch';

import { IUser } from '../types/UserInterface';
import { useUser } from '../hooks/useUser';
import { QueryClient } from '@tanstack/react-query';

interface DashboardContextValues {
  showSidebar: boolean;
  toggleSidebar: () => void;
  logoutUser: (navigate: NavigateFunction) => Promise<void>;
  editProfile: (navigate: NavigateFunction) => void;
  user: IUser;
  isAuthError: boolean;
}

const DashboardContext = createContext<DashboardContextValues | undefined>(
  undefined
);

function DashboardProvider({
  children,
  queryClient,
}: {
  children: React.ReactNode;
  queryClient: QueryClient;
}) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuthError, setIsAuthError] = useState(false);
  const user = useUser().data!.user;

  if (!user) return;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async (navigate: NavigateFunction) => {
    try {
      navigate('/');
      const {
        data: { msg },
      } = await customFetch('/auth/logout');
      queryClient.invalidateQueries();
      toast.success(msg);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      throw error;
    }
  };

  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

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
        isAuthError,
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
