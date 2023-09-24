import { Link } from 'react-router-dom';
import { ProductInfo } from '.';
import customFetch from '../utils/customFetch';

interface ProductButtonProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  id?: string;
}
const ProductButton = ({ link, icon, text, id = '' }: ProductButtonProps) => {
  const handleDeleteProduct = async () => {
    await customFetch.delete(`/products/${id}`);
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
