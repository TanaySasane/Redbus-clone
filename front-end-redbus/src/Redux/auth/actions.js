import * as actionTypes from "./actionTypes";
import axios from "axios";

// Google login
export const loginSuccess = (response) => ({
  type: actionTypes.LOGIN_SUCCESS,
  payload: response.profileObj,
});

export const loginFailure = (response) => ({
  type: actionTypes.LOGIN_FAILURE,
  payload: response.error,
});

export const logout = () => ({ type: actionTypes.LOGOUT });

// Local email/password login
export const localLogin = (email, password) => (dispatch) => {
  // Admin credentials
  if (email === "admin@redbus.com" && password === "admin123") {
    dispatch({
      type: actionTypes.LOCAL_LOGIN_SUCCESS,
      payload: {
        name: "Admin",
        email: "admin@redbus.com",
        profilePicture: null,
        isAdmin: true,
        _id: "admin",
      },
    });
    return { success: true, isAdmin: true };
  }
  // Demo user
  if (email && password.length >= 6) {
    dispatch({
      type: actionTypes.LOCAL_LOGIN_SUCCESS,
      payload: {
        name: email.split("@")[0],
        email,
        profilePicture: null,
        isAdmin: false,
        _id: "local_" + Date.now(),
      },
    });
    return { success: true, isAdmin: false };
  }
  dispatch({ type: actionTypes.LOCAL_LOGIN_FAILURE });
  return { success: false };
};

// Mongo customer
const addCustomerMongoRequest = () => ({ type: actionTypes.ADD_CUSTOMER_MONGO_REQUEST });
const addCustomerMongoSuccess = (id) => ({ type: actionTypes.ADD_CUSTOMER_MONGO_SUCCESS, payload: id });
const addCustomerMongoFailure = () => ({ type: actionTypes.ADD_CUSTOMER_MONGO_FAILURE });

export const addCustomerMongo = (profileObj) => async (dispatch) => {
  dispatch(addCustomerMongoRequest());
  try {
    const customer = {
      name: profileObj.name,
      email: profileObj.email,
      googleId: profileObj.googleId,
      profilePicture: profileObj.imageUrl,
    };
    const res = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/v1/api/customers`,
      customer
    );
    dispatch(addCustomerMongoSuccess(res.data._id.toString()));
  } catch (err) {
    dispatch(addCustomerMongoFailure());
  }
};
