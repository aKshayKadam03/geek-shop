import * as actionTypes from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  cart: [],
  wishlist: [],
};

export const cartWishReducer = (state = initState, { type, data }) => {
  switch (type) {
    case actionTypes.POST_CART_REQUEST:
      return { ...state, isError: false, isLoading: true, isAuth: false };

    case actionTypes.POST_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        cart: [...this.cart, ...data.data],
      };

    case actionTypes.POST_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case actionTypes.GET_CART_REQUEST:
      return { ...state, isError: false, isLoading: true, isAuth: false };

    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        cart: data.data,
      };

    case actionTypes.GET_CART_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};
