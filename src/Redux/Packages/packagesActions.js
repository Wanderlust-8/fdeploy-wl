import axios from "axios";
import diacritics from "diacritics"

export const FETCH_PACKAGES = "FETCH_PACKAGES";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const GET_PACKAGE_BY_ID = "GET_PACKAGE_BY_ID";
export const SEARCH_PACKAGES = "SEARCH_PACKAGES";
export const CLEAR_PACKAGE_DETAILS = "CLEAR_PACKAGE_DETAILS";
export const SET_CITY_FILTER = "SET_CITY_FILTER";
export const SET_DURATION_FILTER = "SET_DURATION_FILTER";
export const SET_PRICE_FILTER = "SET_PRICE_FILTER";
export const SET_SEARCH_FILTER = "SET_SEARCH_FILTER";
export const CLEAR_SEARCH_VIEW = "CLEAR_SEARCH_VIEW";
export const RESET = "RESET"

const URL = "https://deploy-back-kohl.vercel.app"

export const fetchPackages = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/packages`);
      const data = response.data;
      return dispatch({
        type: FETCH_PACKAGES,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addPackages = (newPackage) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${URL}/packages`,
        newPackage
      );
      const data = response.data;
      return dispatch({
        type: ADD_PACKAGE,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPackageById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${URL}/packages/${id}`);
      const data = response.data;
      return dispatch({
        type: GET_PACKAGE_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const SearchPackagesByCountry = (country) => {
  return async (dispatch, getState) => {
    try {
      const { packagesList } = getState().packages;
      const searchQuery = diacritics.remove(country.toLowerCase());

      // Realizar la búsqueda local por país
      const searchResult = packagesList.filter(
        (pkg) =>
          diacritics.remove(pkg.Country.name.toLowerCase()).includes(
            searchQuery
          )
      );

      // Si hay una consulta de búsqueda, actualizamos los resultados de búsqueda
      if (searchQuery) {
        dispatch({
          type: SEARCH_PACKAGES,
          payload: searchResult,
        });
      } else {
        // Si no hay consulta de búsqueda, restablecemos los resultados de búsqueda a un array vacío
        dispatch({
          type: SEARCH_PACKAGES,
          payload: [],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};
  


export const clearPackageDetails = () => {
  return {
    type: CLEAR_PACKAGE_DETAILS,
  };
};

export const clearSearchView = (isUnmounting) => {
  return {
    type: CLEAR_SEARCH_VIEW,
    isUnmounting
  };
};

export const FilterPackagesByCity = (payload) => {
  return {
    type: SET_CITY_FILTER,
    payload
  };
};

 
export const setDurationFilter = (payload) => ({
  type: SET_DURATION_FILTER,
  payload,
});


export const setPriceFilter = (payload) => ({
  type: SET_PRICE_FILTER,
  payload,
});



