import axios from "axios";

export const FETCH_USERS = "FETCH_USERS";
export const ADD_USER = "ADD_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const SEARCH_USERS = "SEARCH_USERS";
export const DELETE_USER = "DELETE_USER";
export const EDIT_USER = "EDIT_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN_USER_ERROR = "LOGIN_USER_ERROR";
export const ADDUSER_SHOPPING = "USER_SHOPPING";
export const CHECKUSER_SHOPPING = "CHECKUSER_SHOPPING";
export const NEW_CART = "NEW_CART";

const URL = "https://deploy-back-kohl.vercel.app"

export const userShopping = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/shoppingCar/user/${id}`
      );
      const data = response.data;
      return dispatch({
        type: CHECKUSER_SHOPPING,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/users`);
      const data = response.data;
      return dispatch({
        type: FETCH_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    try {
      const userResponse = await axios.post(
        `${URL}/users`,
        newUser
      );
      const user = userResponse.data;
      dispatch({
        type: ADD_USER,
        payload: user,
      });
      const cartResponse = await axios.post(
        `${URL}/shoppingCar/user/${user.uid}`
      );
      const cart = cartResponse.data;
      console.log("CARTTTT:", cart);
      dispatch({
        type: NEW_CART,
        payload: cart,
      });
      // console.log("CARTTTTT:", cart);
      return { user, cart };
    } catch (error) {
      console.log(error);
    }
  };
};

export const getUserById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/users/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_USER_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchUsers = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/users?title=${word}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_USERS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${URL}/users/${id}`);
      const data = response.data;
      return dispatch({
        type: DELETE_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editUser = (id, user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(
        `${URL}/users/${id}`,
        user
      );
      const data = response.data;
      return dispatch({
        type: EDIT_USER,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/users`);
      const data = response.data;

      const user = data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        return dispatch({
          type: LOGIN_USER,
          payload: user,
        });
      } else {
        throw new Error("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: error.message,
      });
    }
  };
};
