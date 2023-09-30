import { Link, useNavigate } from 'react-router-dom';

import { ProductInfo } from '.';

interface ProductButtonProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  id?: string;
}
const ProductButton = ({ link, icon, text, id = '' }: ProductButtonProps) => {
  const navigate = useNavigate();
  const component =
    text === 'DELETE' ? (
      <button
        type="button"
        className="btn btn-block btn-delete"
        onClick={() => navigate(`../delete-product/${id}`)}
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
