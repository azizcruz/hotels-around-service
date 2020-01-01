// actions needed libraries
import axios from 'axios'
import {baseURL} from "../variables";
// Api actions are defined here
export const getLocation = (address) => dispatch => {
    dispatch({
                type: 'GET_LOCATION_REQUEST',
                payload: 'request location'
            })
    axios.post(`${baseURL}/api/user_location/get`, {geolocation: address}).then(res => {
            let address = res.data.address;
            dispatch({
                type: 'GET_LOCATION_SUCCESS',
                payload: {address: address, geolocation: res.data.geolocation}
            })
        }
    ).catch(err => dispatch({
        type: 'GET_LOCATION_FAIL',
        error: 'request to location failed'
    }));
    dispatch({
        type: 'GET_LOCATION_REQUEST',
        payload: 'result_of_simple_action'
    })
};

export const getHotelsAround = (geolocation, radius) => dispatch => {
    dispatch({
            type: 'GET_HOTELS_REQUEST',
            payload: 'hotels around request.'
        });
    axios.get(`${baseURL}/api/hotels_around/get/${geolocation}/${radius}`).then(res => {
        dispatch({
            type: 'GET_HOTELS_SUCCESS',
            payload: res.data,
            radius: radius
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: 'GET_HOTELS_FAIL',
            payload: 'request to hotels around failed.'
        })
    })
};

export const getHotelsAroundBasedOnLocation = (address, radius) => dispatch => {
    dispatch({
            type: 'GET_HOTELS_BASED_ON_ADDRESS_REQUEST',
            payload: 'hotels around request.'
        });
    axios.get(`${baseURL}/api/hotels_around_based_on_address/get/${address}/${radius}`).then(res => {
        dispatch({
            type: 'GET_HOTELS_BASED_ON_ADDRESS_SUCCESS',
            payload: res.data,
            radius: radius
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: 'GET_HOTELS_BASED_ON_ADDRESS_FAIL',
            payload: 'request to hotels around failed.'
        })
    })
};