import React from "react";
import { useLocation, useHistory, useParams, Link } from "react-router-dom";

import {
  getSoloProductHandler,
  getProductReviewHandler,
  getRecommendationsHandler,
  getFromSameBrandHandler,
} from "../../Redux/Products/action";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Rating from "@material-ui/lab/Rating";
import {
  MainHeading,
  Paragraph,
  SubHeadingOne,
} from "../../Components/Global/Typography";
import Reviews from "./Reviews";
import Recommendations from "../../Components/Recommendations/Recommendations";

// font-family: 'Lato', sans-serif;
// font-family: 'Montserrat', sans-serif;
// font-family: 'Rajdhani', sans-serif;

const SoloWrapper = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  a {
    text-decoration: none;
    color: #1b1b1b;
    font-weight: 600;
  }
`;

const SoloSection = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  max-width: 1600px;
  margin: 0 auto;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  > div {
    padding: 10px;
    width: 48%;
    min-width: 600px;
  }
`;

const SoloProductImage = styled.div`
  background-color: #ffffff;
  flex-basis: 2;
  > img {
    object-fit: contain;
  }
`;

const SoloProductInfo = styled.div`
  flex-basis: 5;
  display: flex;
  flex-direction: column;

  > div {
    margin: 30px 0;
  }
`;

const ProductPrice = styled.p`
  font-size: 24px;
  font-weight: 700;

  ::before {
    content: "₹ ";
  }
`;
const Category = styled.div`
  letter-spacing: 0.4ch;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;

  text-transform: uppercase;
`;

const AddToCart = styled.button`
  width: 100%;
  font-size: 23px;
  font-weight: 500;
  letter-spacing: 0.5ch;
  background-color: ${(props) => props.theme.btnBackground};
  color: white;
  text-transform: uppercase;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.btnBackground};
  border-radius: 5px;
  outline: none;
  transition: all 500ms ease;
  :hover {
    color: ${(props) => props.theme.btnBackground};
    background-color: white;
  }
`;

const PromotionalSpace = styled.div`
  background: url("https://cdn.pixabay.com/photo/2015/01/08/18/24/children-593313_960_720.jpg");
  min-height: 50vh;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  filter: grayscale(2%);
  display: grid;
  place-content: center;
  font-size: 22px;
  text-transform: capitalize;
  h2 {
    background-color: #ffffff;
    opacity: 0.8;
    padding: 20px;
    color: #140f0f;
  }
`;

const RecommendationWrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  margin: 0px auto 50px;
  h2 {
    text-transform: uppercase;
  }
`;

const RecommendationDisplay = styled.div`
  display: flex;
  align-items: center;
`;

function Solo() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let soloProduct = useSelector((state) => state.productReducer.soloProduct);
  let reviews = useSelector((state) => state.productReducer.reviews);
  let recommendationItems = useSelector(
    (state) => state.productReducer.recommendations
  );
  let moreFromSameBrand = useSelector(
    (state) => state.productReducer.moreFromSameBrand
  );

  let {
    _id,
    product_name,
    price,
    brandId,
    description,
    categoryId,
    product_img,
    ratings,
  } = soloProduct;

  React.useEffect(() => {
    dispatch(getSoloProductHandler(id));
  }, [id]);

  React.useEffect(() => {
    getReviews();
    getRecommendations();
  }, [soloProduct]);

  function getReviews() {
    let payload = {
      userId: "6091344b95595125e0e2c830",
      productId: "608160be94190059c07f3ff4",
    };
    dispatch(getProductReviewHandler(payload));
  }
  function getRecommendations() {
    dispatch(getRecommendationsHandler(categoryId?._id));
    dispatch(getFromSameBrandHandler(brandId?._id));
  }

  return (
    <SoloWrapper id="#" key={_id}>
      <SoloSection>
        <SoloProductImage>
          <img src={product_img} alt={product_name}></img>
        </SoloProductImage>
        <SoloProductInfo>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <Link to="/shop">Shop</Link>
            <Link to="#">{product_name?.slice(0, 20)}</Link>
          </Breadcrumbs>
          <Category>{categoryId?.name}</Category>
          <MainHeading>{product_name}</MainHeading>
          <div>
            <Rating value={+ratings} readOnly></Rating>
          </div>
          <ProductPrice>{price}</ProductPrice>
          <div>
            <Paragraph>{description}</Paragraph>
          </div>
          <div>
            <AddToCart>Add to Cart</AddToCart>
          </div>
        </SoloProductInfo>
      </SoloSection>
      <PromotionalSpace>
        <div>
          <SubHeadingOne>
            Simplicity is about subtracting the obvious and adding the
            meaningful.
          </SubHeadingOne>
        </div>
      </PromotionalSpace>
      <Reviews productId={_id} reviews={reviews} ratings={ratings}></Reviews>

      <RecommendationWrapper>
        <SubHeadingOne>Similar Products</SubHeadingOne>
        <RecommendationDisplay>
          {recommendationItems?.map((item) => (
            <Recommendations key={item?._id} {...item} />
          ))}
        </RecommendationDisplay>
      </RecommendationWrapper>
      <RecommendationWrapper>
        <SubHeadingOne>More from same brand</SubHeadingOne>
        <RecommendationDisplay>
          {moreFromSameBrand?.map((item) => (
            <Recommendations key={item?._id} {...item} />
          ))}
        </RecommendationDisplay>
      </RecommendationWrapper>
    </SoloWrapper>
  );
}

export default Solo;
