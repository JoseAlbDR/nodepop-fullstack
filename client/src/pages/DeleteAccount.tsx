import { Form, redirect, useNavigate, useNavigation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ClickAwayListener } from '@mui/material';

import customFetch from '../utils/customFetch';
import StyledDeleteAccount from '../assets/wrappers/DeleteProduct';
import { Spinner } from '../components';
import { QueryClient } from '@tanstack/react-query';

export const action = (queryClient: QueryClient) => async () => {
  try {
    await customFetch.delete(`/users/delete-user`);
    queryClient.invalidateQueries();
    toast.success(`Account deleted successfully`);
    return redirect('/');
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
      return redirect('/dashboard/profile');
    }
    return error;
  }
};

const DeleteAccount = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  return (
    <StyledDeleteAccount>
      <Form method="post" className="confirm-form">
        {isLoading ? (
          <Spinner />
        ) : (
          <ClickAwayListener onClickAway={() => navigate(-1)}>
            <div className="content">
              <header>
                <h5>Are you sure that you want to delete your account?</h5>
                <p>This operation cant be undone</p>
              </header>
              <div className="buttons">
                <button type="submit" className="btn btn-block danger-btn">
                  Accept
                </button>
                <button
                  type="button"
                  className="btn btn-block cancel-btn"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </ClickAwayListener>
        )}
      </Form>
    </StyledDeleteAccount>
  );
};

export default DeleteAccount;
