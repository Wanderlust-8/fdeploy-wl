import {
  FETCH_PACKAGES,
  ADD_PACKAGE,
  GET_PACKAGE_BY_ID,
  SEARCH_PACKAGES,
  CLEAR_PACKAGE_DETAILS,
  SET_CITY_FILTER,
  SET_DURATION_FILTER,
  SET_PRICE_FILTER,
  CLEAR_SEARCH_VIEW,
} from "./packagesActions";



const initialState = {
  packagesList: [],
  packagesSearch: [],
  packagesFiltered: [],
  packageDetails: {},
  filters: {
  cityFilter: "",
  durationFilter: "Todos",
  priceFilter: "TodosPrecio",
 
  }
  
};

const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES:
      return {
        ...state,
        packagesList: action.payload,
        packagesFiltered: action.payload,
      };
    case ADD_PACKAGE:
      return {
        ...state,
      };
    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        packageDetails: action.payload,
      };
      case SEARCH_PACKAGES:

        return {
          ...state,
          packagesList: action.payload,
          packagesSearch: action.payload,
          packagesFiltered: action.payload, // <-- Actualizar los paquetes filtrados con los resultados de búsqueda
        };

    case CLEAR_PACKAGE_DETAILS:
      return {
        ...state,
        packageDetails: {},
      };

      case CLEAR_SEARCH_VIEW:
        return{
          ...state,
          packagesFiltered:[],
          packagesSearch:[],
          packagesList:[]
        }
      case SET_CITY_FILTER:
        let filteredByCity;
        
        if (action.payload !== 'Todos') {
          filteredByCity = state.packagesList.filter((el) => el.City.name === action.payload);
        } else {
          filteredByCity = state.packagesList; // Si selecciona 'Todos', muestra todos los paquetes sin filtrar
        }
        
        return {
          ...state,
          packagesFiltered: filteredByCity,
          packagesSearch:filteredByCity,
          filters: {
            ...state.filters,
            cityFilter: action.payload,
          },
        };

        case SET_DURATION_FILTER:

        let orderDuration = [...state.packagesList];
        orderDuration = orderDuration.sort((a, b) => {
          if(a.duration < b.duration){
            return action.payload === "Menor-Mayor" ? 1 : -1;
          }
          if(a.duration > b.duration){
            return action.payload === "Menor-Mayor" ? -1 : 1;
          }
          return 0;
        })

        return {
          ...state,
          packagesList: action.payload === "Todos" ? state.packagesFiltered : orderDuration,
          packagesSearch:action.payload === "Todos" ? state.packagesFiltered : orderDuration,
          packagesFiltered:action.payload === "Todos" ? state.packagesFiltered : orderDuration,
        }
    case SET_PRICE_FILTER:
 
      let orderPrice = [...state.packagesList];
        orderPrice = orderPrice.sort((a, b) => {
          if(a.standarPrice < b.standarPrice){
            return action.payload === "MenorPrecio" ? -1 : 1;
          }
          if(a.standarPrice > b.standarPrice){
            return action.payload === "MenorPrecio" ? 1 : -1;
          }
          return 0;
        })

        return {
          ...state,
          packagesList: action.payload === "precios" ? state.packagesFiltered : orderPrice,
          packagesSearch: action.payload === "precios" ? state.packagesFiltered : orderPrice,
          packagesFiltered:action.payload === "precios" ? state.packagesFiltered : orderPrice
        }
  
    default:
      return state;
  }
};


export default packagesReducer;
