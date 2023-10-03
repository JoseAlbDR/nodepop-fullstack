import { FormRow, FormRowInput, SubmitBtn } from '.';
import { Form, ActionFunctionArgs, redirect } from 'react-router-dom';
import { useDashboardContext } from '../context/DashboardContext';
import customFetch from '../utils/customFetch';
import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const action =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { request } = data;
    console.log(request);
    const formData = await request.formData();
    const file = formData.get('avatar');

    if (file instanceof File && file.size > 500000) {
      toast.error('Image size too large');
      return null;
    }

    try {
      const response = await customFetch.patch('/users/update-user', formData);
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
  };

const UpdateProfile = ({ isSubmitting }: { isSubmitting: boolean }) => {
  const { user } = useDashboardContext();
  return (
    <div className="dashboard-page">
      <Form method="post" encType="multipart/form-data">
        <h4>Edit {user.name} Profile</h4>
        <div className="form-center">
          <FormRowInput
            labelText="select an image file (max 0.5MB)"
            type="file"
            id="avatar"
            name="avatar"
          />
          <FormRow
            type="text"
            name="name"
            labelText="name"
            defaultValue={user.name}
            disabled={isSubmitting}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={user.lastName || 'demo user'}
            disabled={isSubmitting}
          />
          <FormRow
            type="email"
            name="email"
            labelText="email"
            defaultValue={user.email}
            disabled={isSubmitting}
          />
          <FormRow
            type="text"
            name="location"
            labelText="location"
            defaultValue={user.location || 'hot dog food truck'}
            disabled={isSubmitting}
          />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </div>
  );
};

export default UpdateProfile;
