import * as actionTypes from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  minPrice: 0,
  maxPrice: 0,
  productsTotal: 0,
  products: [],
  brands: [],
  categories: [],
};

export const productReducer = (state = initState, { type, data }) => {
  switch (type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: data.products,
        productsTotal: data.totalProducts,
        brands: data.brands,
        categories: data.categories,
        minPrice: data.min,
        maxPrice: data.max,
      };

    case actionTypes.GET_PRODUCTS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case actionTypes.FILTER_PRODUCTS_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.FILTER_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: data.products,
        productsTotal: data.totalProducts,
        brands: data.brands,
      };

    case actionTypes.FILTER_PRODUCTS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case actionTypes.FILTER_BRANDS_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.FILTER_BRANDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        products: data.products,
        productsTotal: data.totalProducts,
      };

    case actionTypes.FILTER_BRANDS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
