import { Form, Link } from 'react-router-dom';
import { ProductInfo } from '.';

interface ProductButtonProps {
  icon: React.ReactNode;
  text: string;
  link: string;
  id?: string;
}
const ProductButton = ({ link, icon, text, id = '' }: ProductButtonProps) => {
  const component =
    text === 'DELETE' ? (
      <Form method="post" action={`../delete-product/${id}`}>
        <button className="btn btn-block btn-delete" type="submit">
          <ProductInfo icon={icon} text={text} />
        </button>
      </Form>
    ) : (
      <Link className="btn btn-block btn-contact" to={link}>
        <ProductInfo icon={icon} text={text} />
      </Link>
    );

  return component;
};

export default ProductButton;
