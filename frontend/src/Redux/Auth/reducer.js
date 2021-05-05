import * as actionTypes from "./actionType";

const initState = {
  isLoading: false,
  isError: false,
  isAuth: false,
  userData: {},
  status: 0,
};

export const authReducer = (state = initState, { type, data, status }) => {
  switch (type) {
    case actionTypes.GET_LOGIN_REQUEST:
      return { ...state, isError: false, isLoading: true, isAuth: false };

    case actionTypes.GET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: data.userData,
        isAuth: true,
        status: status,
      };

    case actionTypes.GET_LOGIN_FAILURE:
      console.log(status);
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        status: status,
      };

    case actionTypes.GET_SIGNUP_REQUEST:
      return { ...state, isError: false, isLoading: true, isAuth: false };

    case actionTypes.GET_SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: data.userData,
        isAuth: true,
        status: status,
      };

    case actionTypes.GET_SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        status: status,
      };

    case actionTypes.HANDLE_LOGOUT:
      return {
        ...state,
        isLoading: false,
        isError: false,
        userData: {},
        isAuth: false,
        status: 0,
      };

    default:
      return state;
  }
};
