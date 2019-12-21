import React, {Component} from 'react'
import HEREMap, {Marker} from 'here-maps-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarker } from '@fortawesome/free-solid-svg-icons'


class MapContainer extends Component {

    render() {
        return (
            <React.Fragment>
                <HEREMap
                    appId="6zAybFJVF3qz0C0oZS6l"
                    appCode="l1xIvTZbBiwqcuArZpErZw"
                    center={{lat: 49.44425, lng: 11.09542}}
                    zoom={8}
                    interactive={true}
                    animateCenter={true}
                    hidpi={true}
                >
                    <Marker {...{lat: 49.44425, lng: 11.09542}}>
                        <FontAwesomeIcon icon={faMapMarker} size="2x" color="#e53935" />
                    </Marker>
                </HEREMap>
            </React.Fragment>
        )
    }
}

export default MapContainer
