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

        minPrice: data.min,
        maxPrice: data.max,
      };

    case actionTypes.GET_PRODUCTS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case actionTypes.GET_CATEGORIES_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: data.data,
      };

    case actionTypes.GET_CATEGORIES_FAILURE:
      return { ...state, isLoading: false, isError: true };

    case actionTypes.GET_BRANDS_REQUEST:
      return { ...state, isLoading: true };

    case actionTypes.GET_BRANDS_SUCCESS:
      console.log(data.brands, "brands");
      return {
        ...state,
        isLoading: false,
        brands: data.data,
      };

    case actionTypes.GET_BRANDS_FAILURE:
      return { ...state, isLoading: false, isError: true };

    default:
      return state;
  }
};
