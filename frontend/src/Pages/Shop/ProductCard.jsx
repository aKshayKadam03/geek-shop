import { IsoOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Paragraph } from "../../Components/Global/Typography";
import Rating from "@material-ui/lab/Rating";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

const ProductCardWrapper = styled.div`
  width: 31%;
  margin: 10px;
  min-width: 280px;
  border: 1px solid ${(props) => props.theme.backgroundColor};
  transition: all 400ms ease;
  cursor: pointer;
  /* padding: 5px 10px; */
  padding: 5px 10px;
  box-shadow: 2px 2px 8px #e4e2e2;
  border-radius: 10px;
  :hover {
    box-shadow: 2px 2px 8px #dad7d7;
    transform: scale(1.01);
  }
`;

const ProductImg = styled.div`
  background-color: #ffffff;
  width: 100%;
  display: grid;
  place-items: center;
  padding: 30px;
  > img {
    width: 100%;
    height: 150px;
    object-fit: contain;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 180px;
    font-size: 14px;
  }
`;

const ProductTitle = styled.p`
  font-size: 20px;
  margin: 20px 0px;
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;

  ::before {
    content: "₹ ";
  }
`;
const ProductCategory = styled.div`
  padding: 2px 5px;
  letter-spacing: 0.6ch;
  font-size: 12px;
  border-radius: 2px;
  text-transform: uppercase;
`;

const ProductDesc = styled.div`
  margin: 20px 0px;
`;

const ProductAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0px;
`;

const CardIcon = styled.div`
  background-color: #181717;
  padding: 10px 12px;
  border-radius: 50%;
  color: white;
`;

const CartButton = styled.div`
  background-color: #000000;
  padding: 8px 10px;
  border-radius: 20px;
  min-width: 180px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.2ch;
`;

function ProductCard({
  _id,
  product_name,
  price,
  brand,
  description,
  categoryId,
  product_img,
  reviews,
  ratings,
}) {
  return (
    <ProductCardWrapper>
      <ProductImg>
        <img src={product_img} alt={product_name}></img>
      </ProductImg>

      <ProductInfo>
        <div>
          <div>
            <span>Reviews</span>
          </div>
          <Rating value={ratings} name="disabled" readOnly></Rating>
        </div>
        <div>
          <ProductPrice>{price}</ProductPrice>
        </div>
      </ProductInfo>
      <ProductTitle>{product_name.slice(0, 20)}</ProductTitle>
      {/* <ProductCategory>{categoryId.name}</ProductCategory> */}
      <ProductDesc>
        <Paragraph>{description.slice(0, 200)}...</Paragraph>
      </ProductDesc>
      <ProductAction>
        <CardIcon>
          <i className="far fa-heart"></i>
        </CardIcon>
        <CartButton>
          <div>
            <p>Add to Cart</p>
          </div>
          <CardIcon>
            <i className="fas fa-shopping-cart"></i>
          </CardIcon>
        </CartButton>
      </ProductAction>
    </ProductCardWrapper>
  );
}

export default ProductCard;
