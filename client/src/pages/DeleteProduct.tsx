import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { ClickAwayListener } from '@mui/material';

import customFetch from '../utils/customFetch';
import StyledDeleteProduct from '../assets/wrappers/DeleteProduct';
import { Spinner } from '../components';
import { QueryClient } from '@tanstack/react-query';

export const action =
  (queryClient: QueryClient) => async (data: ActionFunctionArgs) => {
    const { params } = data;
    try {
      await customFetch.delete(`/products/${params.id}`);
      queryClient.invalidateQueries(['userProducts']);
      queryClient.invalidateQueries(['products']);
      queryClient.invalidateQueries(['tags']);
      toast.success(`Product deleted successfully`);
      return redirect('../user-products');
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
        return redirect('../user-products');
      }
      return error;
    }
  };

const DeleteProduct = () => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isLoading = navigation.state === 'submitting';
  return (
    <StyledDeleteProduct>
      <Form method="post" className="confirm-form">
        {isLoading ? (
          <Spinner />
        ) : (
          <ClickAwayListener onClickAway={() => navigate(-1)}>
            <div className="content">
              <header>
                <h5>Are you sure that you want to delete the product?</h5>
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
    </StyledDeleteProduct>
  );
};

export default DeleteProduct;
