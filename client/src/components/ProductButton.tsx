import { Link, useNavigate } from 'react-router-dom';
import { ProductInfo } from '.';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

interface ProductButtonProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  id?: string;
}
const ProductButton = ({ link, icon, text, id = '' }: ProductButtonProps) => {
  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    try {
      await customFetch.delete(`/products/${id}`);
      toast.success(`Product deleted successfully`);
      navigate('../user-products');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.msg);
      }
      console.log(error);
      return error;
    }
  };

  const component =
    text === 'DELETE' ? (
      <button
        className="btn btn-block btn-delete"
        onClick={handleDeleteProduct}
      >
        <ProductInfo icon={icon} text={text} />
      </button>
    ) : (
      <Link className="btn btn-block btn-contact" to={link}>
        <ProductInfo icon={icon} text={text} />
      </Link>
    );

  return component;
};

export default ProductButton;
