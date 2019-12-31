import React, {Component} from 'react'
import {Circle, HereMap, Marker} from 'rc-here-maps';
import {geolocated} from "react-geolocated";
import {connect} from 'react-redux';
import {getHotelsAround, getLocation} from "./../../actions/api_actions";
import "./styles/styles.css"


class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMarker: false,
            center: {
                lat: 0,
                lng: 0
            },
            counter: 0,
            delayLoading: true
        };
        this.bounds = {
            north: 53.1,
            south: 13.1,
            east: 43.1,
            west: 40.1,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Set geolocation data.
        if (this.props.coords) {
            const geolocation = {
                latitude: parseFloat(this.props.coords.latitude).toFixed(3),
                longitude: parseFloat(this.props.coords.longitude).toFixed(3)
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
            console.log(this.state.counter)
            if (this.state.counter === 3 || this.state.counter === 4 || this.props.api.user_geo_location !== prevProps.api.user_geo_location) {
                this.setState({
                    center: {
                        lat: parseFloat(geolocation[0]).toFixed(3),
                        lng: parseFloat(geolocation[1]).toFixed(3),
                    }
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            delayLoading: false
                        })
                    }, 1000)
                })
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.props.api.loading || this.state.delayLoading ? (
                        <div className={"map-overlay"}>
                            <div className="loadingspinner"></div>
                            {(!this.props.coords && this.props.positionError && this.props.positionError.code === 1) ?
                                <small style={{color: "#FFFFFF", marginLeft: 8}}>You did not allow for auto address detection, please provide an address</small> : ""}
                        </div>) : ""
                }
                <HereMap
                    appId="6zAybFJVF3qz0C0oZS6l"
                    appCode="l1xIvTZbBiwqcuArZpErZw"
                    center={{...this.state.center}}
                    zoom={15}

                >


                    <Marker lat={this.state.center.lat} lng={this.state.center.lng}>
                        <div className='pin'></div>
                        <div className='pulse'></div>
                    </Marker>

                    <Circle
                        center={{...this.state.center}}
                        radius={this.props.api.radius}
                        fillColor="#d8161638"
                        strokeColor="#EEE"
                    />

                    {this.props.api.hotels.length > 0 ? (
                        this.props.api.hotels.map((hotel, i) =>
                            (<Marker lat={hotel.position[0]} lng={hotel.position[1]} key={i}>
                                <img src={hotel.icon}/>
                                <small>{hotel.hotel_name}</small>
                            </Marker>)
                        )
                    ) : ("")}
                </HereMap>
                {console.log(this.props)}
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
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000
})(connect(mapStateToProps, mapDispatchToProps)(MapContainer))
