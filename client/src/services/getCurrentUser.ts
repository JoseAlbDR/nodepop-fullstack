import { IUserResponse } from '../types/UserInterface';
import customFetch from '../utils/customFetch';

export const getCurrentUser = async () => {
  const { data }: IUserResponse = await customFetch('/users/current-user');
  return data;
};
