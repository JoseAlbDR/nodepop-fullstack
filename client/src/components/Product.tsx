import { FaCalendarCheck, FaEnvelope, FaMoneyBill } from 'react-icons/fa';
import { ProductInfo } from '.';
import search from '../assets/images/search.svg';
import sale from '../assets/images/Sell.svg';
import noImg from '../assets/images/No-Image-Placeholder.svg';
import StyledProduct from '../assets/wrappers/Product';
import { IProduct } from '../types/Products';
import day from 'dayjs';
import ProductCategories from './ProductCategories';
import React from 'react';
interface ProductProps extends IProduct {}

const Product = ({
  // _id,
  createdAt,
  // updatedAt,
  createdBy,
  image,
  name,
  onSale,
  price,
  tags,
}: ProductProps) => {
  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const imgElement = e.currentTarget;
    imgElement.src = noImg;
  };

  const date = day(createdAt).format('D MMM, YYYY');
  return (
    <StyledProduct>
      <img
        className="img"
        src={image}
        alt={`${name} image`}
        onError={handleImageError}
      />
      <div className="content">
        <div className={`status ${onSale ? 'on-sale' : 'search'}`}>
          {onSale ? 'on-sale' : 'search'}
          <img src={onSale ? sale : search} alt="" />
        </div>
        <h2 className="title">{name}</h2>
        <ProductInfo icon={<FaMoneyBill />} text={price + '€'} />
        <ProductInfo icon={<FaCalendarCheck />} text={date} />
        <ProductCategories tags={tags} />
        <a
          className="btn btn-block btn-contact"
          href={`mailto:${createdBy.email}`}
        >
          <ProductInfo icon={<FaEnvelope />} text="CONTACT" />
        </a>
      </div>
    </StyledProduct>
  );
};

export default Product;
