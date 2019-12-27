let initialState = {
 loading: false,
 hotels: [],
 error: null,
 user_geo_location: null
};
// Here reducers are defined for the api
export default (state = initialState , action) => {
 switch (action.type) {
  case 'GET_LOCATION_REQUEST':
   return {
    ...state,
    loading: true
   };
   case 'GET_LOCATION_SUCCESS':
   return {
    ...state,
    loading: false,
    address: action.payload.address,
    user_geo_location: action.payload.geolocation
   };
   case 'GET_LOCATION_FAIL':
   return {
    ...state,
    loading: false,
    error: action.payload
   };

   case 'GET_HOTELS_REQUEST':
   return {
    ...state,
    loading: true,
   };

   case 'GET_HOTELS_SUCCESS':
   return {
    ...state,
    loading: false,
    hotels: action.payload
   };

   case 'GET_HOTELS_FAIL':
   return {
    ...state,
    loading: false,
    error: action.payload
   };

  default:
   return state
 }
};