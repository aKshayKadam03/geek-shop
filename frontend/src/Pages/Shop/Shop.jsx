import React from "react";
import styled from "styled-components";
import { PageWrapper } from "../../Components/Global/Wrapper";
import Filter from "./Filter";
import { useHistory } from "react-router-dom";
import {
  getProductsHandler,
  getCategoriesHandler,
  getBrandsHandler,
} from "../../Redux/Products/action";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { Paragraph, SubHeadingThree } from "../../Components/Global/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Hero from "./Carousel";
import {
  getCartHandler,
  postCartHandler,
  getWishlistHandler,
  postWishlistHandler,
  deleteWishlistHandler,
} from "../../Redux/CartWish/action";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
}));

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

const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SortingField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  p {
    font-size: 22px;
  }
`;

const ShopItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PaginationWapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: row-reverse;
`;

function Shop() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducer.products);
  const productsTotal = useSelector(
    (state) => state.productReducer.productsTotal
  );
  const brands = useSelector((state) => state.productReducer.brands);
  const categories = useSelector((state) => state.productReducer.categories);
  const minPrice = useSelector((state) => state.productReducer.minPrice);
  const maxPrice = useSelector((state) => state.productReducer.maxPrice);
  const userData = useSelector((state) => state.authReducer.userData);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const wishlistArray = useSelector((state) => state.cartWishReducer.wishlist);
  const productsInCart = useSelector(
    (state) => state.cartWishReducer.uniqueCart
  );
  const productsInWishlist = useSelector(
    (state) => state.cartWishReducer.uniqueWishlist
  );

  const [priceLimit, setPriceLimit] = React.useState([0, 1000000000000]);
  const [brandsArray, setBrandsArray] = React.useState([]);
  const [categoriesArray, setCategoriesArray] = React.useState([]);
  const [allProducts, setAllProducts] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const history = useHistory();

  React.useEffect(() => {
    setAllProducts(products);
  }, [products]);

  React.useEffect(() => {
    setPriceLimit([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

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

  function getProducts() {
    let payload = {
      priceLimit,
      categoriesArray,
      brandsArray,
    };
    dispatch(getProductsHandler(payload, currentPage));
  }

  React.useEffect(() => {
    setCurrentPage(1);
  }, [brandsArray, categoriesArray]);

  React.useEffect(() => {
    getProducts();
  }, [priceLimit, categoriesArray, brandsArray, currentPage]);

  React.useEffect(() => {
    getProducts();
    dispatch(getCategoriesHandler());
    dispatch(getBrandsHandler());
  }, []);

  function addToCartHandler(productId) {
    if (!isAuth) {
      return history.push("/auth/login");
    }
    let payload = {
      userId: userData?._id,
      productId,
    };
    dispatch(postCartHandler(payload)).then((res) =>
      dispatch(getCartHandler(userData._id))
    );
  }
  function addToWishlistHandler(productId) {
    if (!isAuth) {
      return history.push("/auth/login");
    }
    let payload = {
      userId: userData?._id,
      productId,
    };
    dispatch(postWishlistHandler(payload)).then((res) =>
      dispatch(getWishlistHandler(userData._id))
    );
  }
  function removeFromWishlistHandler(productId) {
    let wishlistSolo = wishlistArray.find(
      (item) => item.productId._id === productId
    );
    console.log(wishlistSolo, "wishlist");
    dispatch(deleteWishlistHandler(wishlistSolo?._id)).then((res) =>
      dispatch(getWishlistHandler(userData._id))
    );
  }

  return (
    <PageWrapper>
      <Hero></Hero>
      <Container>
        <Filter
          minPrice={minPrice}
          maxPrice={maxPrice}
          brands={brands}
          categories={categories}
          setPriceLimit={setPriceLimit}
          priceLimit={priceLimit}
          onCategoryChangeHandler={onCategoryChangeHandler}
          onBrandChangeHandler={onBrandChangeHandler}
        ></Filter>
        <ShopContainer>
          <SortingField>
            <div>
              <Paragraph>
                {productsTotal} {productsTotal === 1 ? "Product" : "Products"}
              </Paragraph>
            </div>
            {/* <div>
              <label htmlFor="price">Sort by price</label>
              <select
                onChange={(e) => setSortHigh(e.target.value)}
                name="price"
                id="price"
              >
                <option value={true}>High to low</option>
                <option value={false}>Low to high</option>
              </select>
            </div> */}
          </SortingField>
          <ShopItems>
            {allProducts?.map((item) => (
              <ProductCard
                removeFromWishlistHandler={removeFromWishlistHandler}
                addToCartHandler={addToCartHandler}
                productsInCart={productsInCart}
                addToWishlistHandler={addToWishlistHandler}
                productsInWishlist={productsInWishlist}
                key={item._id}
                {...item}
              ></ProductCard>
            ))}
          </ShopItems>
          <PaginationWapper>
            <div className={classes.root}>
              <Pagination
                count={Math.ceil(productsTotal / 9)}
                variant="outlined"
                shape="rounded"
                page={currentPage}
                onChange={(e, page) => setCurrentPage(page)}
              />
            </div>
          </PaginationWapper>
        </ShopContainer>
      </Container>
    </PageWrapper>
  );
}

export default Shop;
