import { useNavigation, ActionFunctionArgs, redirect } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import StyledProfile from '../assets/wrappers/DashboardFormPage';

import ChangePassword from '../components/UpdatePassword';
import UpdateProfile from '../components/UpdateProfile';
export const action =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { request } = data;
    const formData = await request.formData();
    const formId = formData.get('form-id');

    if (formId === 'profile') {
      const file = formData.get('avatar');

      if (file instanceof File && file.size > 500000) {
        toast.error('Image size too large');
        return null;
      }

      try {
        const response = await customFetch.patch(
          '/users/update-user',
          formData
        );
        queryClient.invalidateQueries(['user']);
        toast.success(response.data.msg);
        return redirect('/dashboard');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.msg);
        }
        console.log(error);
        return null;
      }
    }

    if (formId === 'password') {
      const passwordData = {
        oldPassword: formData.get('oldPassword'),
        newPassword: formData.get('newPassword'),
        repeatNewPassword: formData.get('repeatNewPassword'),
      };

      try {
        const response = await customFetch.post(
          '/users/update-password',
          passwordData
        );
        queryClient.invalidateQueries(['user']);
        toast.success(response.data.msg);
        return redirect('/dashboard');
      } catch (error) {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data?.msg);
        }
        console.log(error);
        return null;
      }
    }
  };

const Profile = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <StyledProfile>
      <UpdateProfile isSubmitting={isSubmitting} />
      <ChangePassword isSubmitting={isSubmitting} />
    </StyledProfile>
  );
};
export default Profile;
