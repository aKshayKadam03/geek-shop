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

export const getProductsHandler = (payload, currentPage) => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .post(`http://localhost:8000/products?page=${currentPage}`, payload)
    .then((res) => dispatch(getProductsSuccess(res.data)))
    .catch((err) => dispatch(getProductsFailure()));
};

const getCategoriesRequest = () => {
  return {
    type: actionTypes.GET_CATEGORIES_REQUEST,
  };
};

const getCategoriesSuccess = (data) => {
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    data,
  };
};

const getCategoriesFailure = () => {
  return {
    type: actionTypes.GET_CATEGORIES_FAILURE,
  };
};

export const getCategoriesHandler = () => (dispatch) => {
  dispatch(getCategoriesRequest());
  return axios
    .get("http://localhost:8000/categories")
    .then((res) => dispatch(getCategoriesSuccess(res.data)))
    .catch((err) => dispatch(getCategoriesFailure()));
};

const getBrandsRequest = () => {
  return {
    type: actionTypes.GET_BRANDS_REQUEST,
  };
};

const getBrandsSuccess = (data) => {
  return {
    type: actionTypes.GET_BRANDS_SUCCESS,
    data,
  };
};

const getBrandsFailure = () => {
  return {
    type: actionTypes.GET_BRANDS_FAILURE,
  };
};

export const getBrandsHandler = () => (dispatch) => {
  dispatch(getBrandsRequest());
  return axios
    .get("http://localhost:8000/brands")
    .then((res) => dispatch(getBrandsSuccess(res.data)))
    .catch((err) => dispatch(getBrandsFailure()));
};
