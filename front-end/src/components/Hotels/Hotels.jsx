import React, { Component } from "react";
import { connect } from "react-redux";
import "./styles/style.css";

class Hotels extends Component {
  constructor(props) {
    super(props);
    this.min = 0;
  }

  render() {
    return (
      <div className={"lime-home-recommendations"}>
        {this.props.api.hotels.length > 0 ? (
          this.props.api.hotels.map((hotel, i) => (
            <div className={"lh-card"} key={i}>
              <h3>{hotel.hotel_name}</h3>
              <p>{hotel.rating === 0 ? "Not rated" : hotel.rating + "/5"}</p>
              <p>
                Distance:{" "}
                {hotel.distance < 1000
                  ? hotel.distance + "m"
                  : hotel.distance / 1000 + "km"}
              </p>
            </div>
          ))
        ) : (
          <p
            style={{ textAlign: "center", maxWidth: 320, margin: "100px auto" }}
          >
            There are no hotels around <br />
            <strong>
              (if this message is still appearing please get your address then
              click on found hotels)
            </strong>
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

export default connect(mapStateToProps, null)(Hotels);
