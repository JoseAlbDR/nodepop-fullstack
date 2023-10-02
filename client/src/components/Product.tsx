import {
  FaCalendarCheck,
  FaEnvelope,
  FaMoneyBill,
  FaPencilRuler,
  FaTrash,
  FaUser,
} from 'react-icons/fa';
import day from 'dayjs';

import { ProductButton, ProductInfo, ProductCategories } from '.';
import search from '../assets/images/search.svg';
import sale from '../assets/images/sell.svg';
import StyledProduct from '../assets/wrappers/Product';
import { IProduct } from '../types/Products';
import { useDashboardContext } from '../context/DashboardContext';

interface ProductProps extends IProduct {}

const Product = ({
  _id,
  createdAt,
  // updatedAt,
  createdBy,
  image,
  name,
  onSale,
  price,
  tags,
}: ProductProps) => {
  const { user } = useDashboardContext();

  const date = day(createdAt).format('D MMM, YYYY');
  return (
    <StyledProduct>
      <img className="img" src={image} alt={`${name} image`} />
      <div className="content">
        <div className={`status ${onSale ? 'on-sale' : 'search'}`}>
          {onSale ? 'on-sale' : 'search'}
          <img src={onSale ? sale : search} alt="" />
        </div>
        <h2 className="title">{name}</h2>
        <ProductInfo icon={<FaMoneyBill />} text={price + '€'} />
        <ProductInfo icon={<FaUser />} text={createdBy.name} />
        <ProductInfo icon={<FaCalendarCheck />} text={date} />
        <ProductCategories tags={tags} />
        {createdBy.email !== user.email ? (
          <ProductButton
            link={`mailto:${createdBy.email}`}
            icon={<FaEnvelope />}
            text={'CONTACT'}
          />
        ) : (
          <div className="update-delete-btn">
            <ProductButton
              link={`../edit-product/${_id}`}
              icon={<FaPencilRuler />}
              text={'UPDATE'}
            />
            <ProductButton
              link={''}
              icon={<FaTrash />}
              text={'DELETE'}
              id={_id}
            />
          </div>
        )}
      </div>
    </StyledProduct>
  );
};

export default Product;
