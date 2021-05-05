import axios from "axios";
import * as actionTypes from "./actionType";

//cart post

const postCartRequest = () => {
  return {
    type: actionTypes.POST_CART_REQUEST,
  };
};

const postCartSuccess = (data) => {
  return {
    type: actionTypes.POST_CART_SUCCESS,
    data,
  };
};

const postCartFailure = () => {
  return {
    type: actionTypes.POST_CART_FAILURE,
  };
};

export const postCartHandler = (payload) => (dispatch) => {
  dispatch(postCartRequest());
  return axios
    .post(`http://localhost:8000/cart`, payload)
    .then((res) => dispatch(postCartSuccess(res.data)))
    .catch((err) => dispatch(postCartFailure()));
};

//cart get

const getCartRequest = () => {
  return {
    type: actionTypes.POST_CART_REQUEST,
  };
};

const getCartSuccess = (data) => {
  return {
    type: actionTypes.POST_CART_SUCCESS,
    data,
  };
};

const getCartFailure = () => {
  return {
    type: actionTypes.POST_CART_FAILURE,
  };
};

export const getCartHandler = (id) => (dispatch) => {
  dispatch(getCartRequest());
  return axios
    .get(`http://localhost:8000/cart/${id}`)
    .then((res) => dispatch(getCartSuccess(res.data)))
    .catch((err) => dispatch(getCartFailure()));
};
