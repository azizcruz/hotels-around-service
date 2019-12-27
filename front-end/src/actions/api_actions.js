// actions needed libraries
import axios from 'axios'
import {geolocated} from "react-geolocated";

// Api actions are defined here
export const getLocation = (address) => dispatch => {
    dispatch({
                type: 'GET_LOCATION_REQUEST',
                payload: 'request location'
            })
    axios.post(`http://127.0.0.1:8000/api/user_location/get`, {geolocation: address}).then(res => {
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
    console.log('yes')
    dispatch({
            type: 'GET_HOTELS_REQUEST',
            payload: 'hotels around request.'
        });
    axios.get(`http://127.0.0.1:8000/api/hotels_around/get/${geolocation}/${radius}`).then(res => {
        console.log(res)
        dispatch({
            type: 'GET_HOTELS_SUCCESS',
            payload: res.data
        })
    }).catch(err => {
        console.log(err);
        dispatch({
            type: 'GET_HOTELS_FAIL',
            payload: 'request to hotels around failed.'
        })
    })
};