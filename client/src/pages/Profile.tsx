import { ActionFunctionArgs, Form, useNavigation } from 'react-router-dom';
import StyledProfile from '../assets/wrappers/DashboardFormPage';
import { FormRow, SubmitBtn } from '../components';
import { useDashboardContext } from '../context/DashboardContext';
import FormRowInput from '../components/FormRowInput';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import customFetch from '../utils/customFetch';

export const action = async (data: ActionFunctionArgs) => {
  const { request } = data;
  const formData = await request.formData();
  const file = formData.get('avatar');

  if (file instanceof File && file.size > 500000) {
    console.log(file.size);
    toast.error('Image size too large');
    return null;
  }

  try {
    const response = await customFetch.patch('/users/update-user', formData);
    toast.success(response.data.msg);
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
  return null;
};

const Profile = () => {
  const { user } = useDashboardContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <StyledProfile>
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
    </StyledProfile>
  );
};
export default Profile;
