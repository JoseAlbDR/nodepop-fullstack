import { Link } from 'react-router-dom';
import { ProductInfo } from '.';

interface ContactUpdateLinkProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}
const ContactUpdateLink = ({ link, icon, text }: ContactUpdateLinkProps) => {
  return (
    <Link className="btn btn-block btn-contact" to={link}>
      <ProductInfo icon={icon} text={text} />
    </Link>
  );
};

export default ContactUpdateLink;
