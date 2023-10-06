import {
  FaCalendarCheck,
  FaEnvelope,
  FaMoneyBill,
  FaPencilRuler,
  FaTrash,
  FaUser,
} from 'react-icons/fa';
import day from 'dayjs';
import Heart from 'react-animated-heart';

import { ProductButton, ProductInfo, ProductCategories } from '.';
import search from '../assets/images/search.svg';
import sale from '../assets/images/sell.svg';
import StyledProduct from '../assets/wrappers/Product';
import { IProduct } from '../types/Products';
import { useDashboardContext } from '../context/DashboardContext';
import { useState } from 'react';
import { useAddLike, useRemoveLike } from '../hooks/useAddDeleteLikes';

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
  likes,
}: ProductProps) => {
  const { user } = useDashboardContext();
  const date = day(createdAt).format('D MMM, YYYY');
  const like = likes.filter((like) => like.product === _id);

  const { addLike } = useAddLike();
  const { removeLike } = useRemoveLike();

  let liked = false;
  if (
    like.length > 0 &&
    like[0].product === _id &&
    like[0].user === user._id &&
    user._id !== createdBy._id
  ) {
    liked = true;
  }

  const [click, setClick] = useState(liked);

  const handleLikeClick = () => {
    console.log(click);
    if (!click) {
      addLike(_id);
      setClick(true);
    }

    if (click) {
      removeLike(_id);
      setClick(false);
    }
  };

  return (
    <StyledProduct>
      <img className="img" src={image} alt={`${name} image`} />
      <div className="content">
        <div className="content-header">
          {user._id !== createdBy._id ? (
            <Heart isClick={liked} onClick={handleLikeClick} />
          ) : (
            <div></div>
          )}
          <div className={`status ${onSale ? 'on-sale' : 'search'}`}>
            {onSale ? 'on-sale' : 'search'}
            <img src={onSale ? sale : search} alt="" />
          </div>
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
