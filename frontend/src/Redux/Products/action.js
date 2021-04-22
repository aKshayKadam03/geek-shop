import axios from "axios";
import * as actionTypes from "./actionType";

const getProductsRequest = () => {
  return {
    type: actionTypes.GET_PRODUCTS_REQUEST,
  };
};

const getProductsSuccess = (data) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    data,
  };
};

const getProductsFailure = () => {
  return {
    type: actionTypes.GET_PRODUCTS_FAILURE,
  };
};

export const getProductsHandler = () => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .get("http://localhost:8000/products")
    .then((res) => dispatch(getProductsSuccess(res.data)))
    .catch((err) => dispatch(getProductsFailure()));
};
