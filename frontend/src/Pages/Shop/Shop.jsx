import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../../Components/Global/Wrapper";
import Filter from "./Filter";
import {
  getProductsHandler,
  filterProductsHandler,
  filterBrandsHandler,
} from "../../Redux/Products/action";
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
  max-width: 1600px;
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
  flex-wrap: wrap;
  align-items: flex-start;
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

  const onCategoryChangeHandler = (e) => {
    let arr = [];
    let categoryClass = document.getElementsByClassName("categories");
    for (let i = 0; i < categoryClass.length; i++) {
      if (categoryClass[i].checked) {
        arr.push(categoryClass[i].name);
      }
    }
    setCategoriesArray(arr);
  };

  const onBrandChangeHandler = (e) => {
    let arr = [];
    let brandClass = document.getElementsByClassName("brands");
    for (let i = 0; i < brandClass.length; i++) {
      if (brandClass[i].checked) {
        arr.push(brandClass[i].name);
      }
    }
    setBrandsArray(arr);
  };

  function clearCheckbox(className) {
    let element = document.getElementsByClassName(className);
    for (let i = 0; i < element.length; i++) {
      element[i].checked = false;
    }
  }

  function categoryHandler() {
    if (categoriesArray.length === 0) {
      let payload = {
        priceLimit,
      };
      dispatch(getProductsHandler(payload));
    } else {
      let payload = {
        priceLimit,
        categoriesArray,
        brandsArray,
      };
      dispatch(filterProductsHandler(payload));
    }
  }

  function brandHandler() {
    if (brandsArray.length === 0) {
      categoryHandler();
    } else {
      let payload = {
        priceLimit,
        categoriesArray,
        brandsArray,
      };
      dispatch(filterBrandsHandler(payload));
    }
  }

  React.useEffect(() => {
    clearCheckbox("brands");
    categoryHandler();
  }, [categoriesArray]);

  React.useEffect(() => {
    brandHandler();
  }, [brandsArray]);

  React.useEffect(() => {
    let payload = {
      priceLimit,
    };
    dispatch(getProductsHandler(payload));
    setCategoriesArray([]);
    setBrandsArray([]);
    clearCheckbox("brands");
    clearCheckbox("categories");
  }, [priceLimit]);

  return (
    <PageWrapper>
      <Catalog></Catalog>
      <Container>
        <Filter
          minPrice={minPrice}
          maxPrice={maxPrice}
          brands={brands}
          categories={categories}
          setPriceLimit={setPriceLimit}
          onCategoryChangeHandler={onCategoryChangeHandler}
          onBrandChangeHandler={onBrandChangeHandler}
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
