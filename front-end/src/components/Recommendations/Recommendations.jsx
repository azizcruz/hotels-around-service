import React, {Component} from 'react'
import {connect} from 'react-redux';


class Recommendations extends Component {
    constructor(props) {
        super(props);
        this.min = 0;
    }

    render() {
        return (
            <div className={'lime-home-recommendations'}>
                {this.props.api.hotels.length > 0 ? (
                    this.props.api.hotels.map(hotel =>
                        (<div className={'lh-card'}>{hotel.hotel_name}</div>)
                    )
                ) : "there are no hotels around."}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps, null)(Recommendations)
