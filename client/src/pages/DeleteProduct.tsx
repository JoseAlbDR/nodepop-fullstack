import {
  ActionFunctionArgs,
  Form,
  redirect,
  useNavigate,
} from 'react-router-dom';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import StyledDeleteProduct from '../assets/wrappers/DeleteProduct';
import { ClickAwayListener } from '@mui/material';

export const action = async (data: ActionFunctionArgs) => {
  const { params } = data;
  try {
    await customFetch.delete(`/products/${params.id}`);
    toast.success(`Product deleted successfully`);
    return redirect('../user-products');
  } catch (error) {
    if (error instanceof AxiosError) {
      toast.error(error?.response?.data?.msg);
    }
    console.log(error);
    return error;
  }
};

const DeleteProduct = () => {
  const navigate = useNavigate();
  return (
    <StyledDeleteProduct>
      <Form method="post" className="confirm-form">
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
      </Form>
    </StyledDeleteProduct>
  );
};

export default DeleteProduct;
