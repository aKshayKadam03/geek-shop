import { IsoOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Paragraph } from "../../Components/Global/Typography";
import Rating from "@material-ui/lab/Rating";

const ProductCardWrapper = styled.div`
  width: 30%;
  margin: 10px;
  min-width: 250px;
  border: 1px solid ${(props) => props.theme.backgroundColor};
  transition: all 400ms ease;
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px 8px #dad7d7;
    transform: scale(1.1);
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
    height: 200px;
    object-fit: contain;
  }
`;

const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  justify-content: space-between;
  > * {
    margin: 4px;
  }
`;

const ProductTitle = styled.p`
  font-size: 20px;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: 600;
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

function ProductCard({
  _id,
  product_name,
  price,
  brand,
  description,
  category,
  product_img,
  reviews,
  ratings,
}) {
  console.log(ratings);
  return (
    <ProductCardWrapper>
      <ProductImg>
        <img src={product_img} alt={product_name}></img>
      </ProductImg>
      <ProductContent>
        <ProductTitle>{product_name.slice(0, 21)}</ProductTitle>
        <ProductPrice>{price}</ProductPrice>
        <ProductCategory>{category}</ProductCategory>
        <Rating value={ratings} name="disabled" readOnly></Rating>
      </ProductContent>
    </ProductCardWrapper>
  );
}

export default ProductCard;
