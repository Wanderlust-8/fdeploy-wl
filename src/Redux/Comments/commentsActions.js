import axios from "axios";

export const FETCH_COMENTS = "FETCH_COMENTS";
export const ADD_COMENT = "ADD_COMENT";
export const GET_COMENT_BY_ID = "GET_COMENT_BY_ID";
export const SEARCH_COMENTS = "SEARCH_COMENTS";

const URL = "https://deploy-back-kohl.vercel.app"

export const fetchComents = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/coments`);
      const data = response.data;
      return dispatch({
        type: FETCH_COMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComents = (newComent) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/coments`,
        newComent
      );
      const data = response.data;
      return dispatch({
        type: ADD_COMENT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getComentById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/coments/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_COMENT_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchComents = (word) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${URL}/coments?title=${word}`
      );
      const data = response.data;
      return dispatch({
        type: SEARCH_COMENTS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
