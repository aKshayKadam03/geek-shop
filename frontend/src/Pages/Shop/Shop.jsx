import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../../Components/Global/Wrapper";
import Filter from "./Filter";
import { getProductsHandler } from "../../Redux/Products/action";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { Paragraph } from "../../Components/Global/Typography";

const Catalog = styled.div`
  height: 300px;
  width: 100%;
  background-color: yellow;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin: 50px auto;
  max-width: 1400px;
  > div {
    padding: 10px;
  }
  > div:nth-child(1) {
    width: 25%;
  }
  > div:nth-child(2) {
    width: 75%;
  }
`;

const ShopItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

function Shop() {
  const [priceLimit, setPriceLimit] = React.useState(90000);

  const [brandsArray, setBrandsArray] = React.useState([]);
  const [categoriesArray, setCategoriesArray] = React.useState([]);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const productsTotal = useSelector(
    (state) => state.productReducer.productsTotal
  );
  const brands = useSelector((state) => state.productReducer.brands);
  const categories = useSelector((state) => state.productReducer.categories);
  const minPrice = useSelector((state) => state.productReducer.minPrice);
  const maxPrice = useSelector((state) => state.productReducer.maxPrice);
  const brandsCount = useSelector((state) => state.productReducer.brandsCount);
  const categoriesCount = useSelector(
    (state) => state.productReducer.categoriesCount
  );

  const onCategoryChangeHandler = (e) => {
    console.log(e);
  };

  const onBrandChangeHandler = () => {};

  React.useEffect(() => {
    let payload = {
      priceLimit,
    };
    dispatch(getProductsHandler(payload));
  }, [priceLimit]);

  return (
    <PageWrapper>
      <Catalog></Catalog>
      <Container>
        <Filter
          brandsCount={brandsCount}
          categoriesCount={categoriesCount}
          minPrice={minPrice}
          maxPrice={maxPrice}
          brands={brands}
          categories={categories}
          setPriceLimit={setPriceLimit}
          onCategoryChangeHandler={onCategoryChangeHandler}
        ></Filter>
        <ShopItems>
          {products?.map((item) => (
            <ProductCard key={item._id} {...item}></ProductCard>
          ))}
        </ShopItems>
      </Container>
    </PageWrapper>
  );
}

export default Shop;
