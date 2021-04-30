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

export const getProductsHandler = (payload) => (dispatch) => {
  dispatch(getProductsRequest());
  return axios
    .post("http://localhost:8000/products", payload)
    .then((res) => dispatch(getProductsSuccess(res.data)))
    .catch((err) => dispatch(getProductsFailure()));
};

const filterProductsRequest = () => {
  return {
    type: actionTypes.FILTER_PRODUCTS_REQUEST,
  };
};

const filterProductsSuccess = (data) => {
  return {
    type: actionTypes.FILTER_PRODUCTS_SUCCESS,
    data,
  };
};

const filterProductsFailure = () => {
  return {
    type: actionTypes.FILTER_PRODUCTS_FAILURE,
  };
};

export const filterProductsHandler = (payload) => (dispatch) => {
  dispatch(filterProductsRequest());
  return axios
    .post("http://localhost:8000/products/filter/categories", payload)
    .then((res) => dispatch(filterProductsSuccess(res.data)))
    .catch((err) => dispatch(filterProductsFailure()));
};

const filterBrandsRequest = () => {
  return {
    type: actionTypes.FILTER_BRANDS_REQUEST,
  };
};

const filterBrandsSuccess = (data) => {
  return {
    type: actionTypes.FILTER_BRANDS_SUCCESS,
    data,
  };
};

const filterBrandsFailure = () => {
  return {
    type: actionTypes.FILTER_BRANDS_FAILURE,
  };
};

export const filterBrandsHandler = (payload) => (dispatch) => {
  dispatch(filterBrandsRequest());
  return axios
    .post("http://localhost:8000/products/filter/brands", payload)
    .then((res) => dispatch(filterBrandsSuccess(res.data)))
    .catch((err) => dispatch(filterBrandsFailure()));
};
