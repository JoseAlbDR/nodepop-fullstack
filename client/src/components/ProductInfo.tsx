import React from 'react';
import StyledProductInfo from '../assets/wrappers/ProductInfo';
interface ProductInforProps {
  icon: React.ReactNode;
  text: string;
}

const ProductInfo = ({ icon, text }: ProductInforProps) => {
  return (
    <StyledProductInfo>
      <span className="product-icon">{icon}</span>
      <span className="product-text">{text}</span>
    </StyledProductInfo>
  );
};

export default ProductInfo;
