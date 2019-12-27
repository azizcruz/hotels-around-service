import React, {Component} from 'react'
import {HEREMap} from 'here-maps-react';
import {geolocated} from "react-geolocated";
import {connect} from 'react-redux';
import {getLocation, getHotelsAround} from "./../../actions/api_actions";
import "./styles/styles.css"


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMarker: false,
            center: {
                lat: '',
                lng: ''
            },
            counter: 0
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Set geolocation data.
        if (this.props.coords) {
            const geolocation = {
                latitude: this.props.coords.latitude,
                longitude: this.props.coords.longitude
            };
            this.state.counter += 1;
            if (this.state.counter === 1) {
                this.props.getLocation(`${geolocation.latitude},${geolocation.longitude}`);
                // call the action to get hotels around address.
                this.props.getHotelsAround(`${geolocation.latitude},${geolocation.longitude}`, 500);
                this.setState({
                    showMark: true
                })
            }
        }
        // Set geolocation data into the map.
        if (this.props.api.user_geo_location) {
            const geolocation = this.props.api.user_geo_location.split(',');
            if (this.state.counter === 3) {
                this.setState({
                    center: {
                        lat: parseFloat(geolocation[0]).toFixed(3),
                        lng: parseFloat(geolocation[1]).toFixed(3)
                    }
                })
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <HEREMap
                    appId="6zAybFJVF3qz0C0oZS6l"
                    appCode="l1xIvTZbBiwqcuArZpErZw"
                    center={{...this.state.center}}
                    zoom={18}
                    interactive={true}
                    hidpi={true}
                >

                    {/*<Marker {...this.state.center}>*/}
                    {/*    <div className='pin'></div>*/}
                    {/*    <div className='pulse'></div>*/}
                    {/*</Marker>*/}
                </HEREMap>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    getLocation: (address) => dispatch(getLocation(address)),
    getHotelsAround: (address, radius) => dispatch(getHotelsAround(address, radius))
});

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))
