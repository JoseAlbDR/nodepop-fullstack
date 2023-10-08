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
import { useEffect, useState } from 'react';
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
  numOfLikes,
}: ProductProps) => {
  const { user } = useDashboardContext();
  const date = day(createdAt).format('D MMM, YYYY');
  const like = likes.filter(
    (like) => like.product === _id && like.user === user._id
  );

  const { addLike, isLoading } = useAddLike();
  const { removeLike } = useRemoveLike();

  let liked: boolean | ((prevState: boolean) => boolean);
  if (
    like.length > 0 &&
    like[0].product === _id &&
    like[0].user === user._id &&
    user._id !== createdBy._id
  ) {
    liked = true;
  } else {
    liked = false;
  }

  const [click, setClick] = useState(false);

  useEffect(() => {
    setClick(liked);
  }, [liked]);

  const handleLikeClick = () => {
    if (user._id === createdBy._id) return;
    if (!click) {
      addLike(_id);
    }

    if (click) {
      removeLike(_id);
    }
  };

  console.log(isLoading);

  return (
    <StyledProduct>
      <img className="img" src={image} alt={`${name} image`} />
      <div className="content">
        <div className="content-header">
          <div className="product-likes">
            <Heart
              isClick={liked}
              onClick={isLoading ? () => {} : handleLikeClick}
            />
            <span className="likes">{numOfLikes}</span>
          </div>
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
