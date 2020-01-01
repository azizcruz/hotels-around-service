import React, {Component} from 'react'
import './styles/style.css'
import {connect} from 'react-redux';
import {getHotelsAround, getHotelsAroundBasedOnLocation, getLocation} from "../../actions/api_actions";


class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            radius: 500,
            formattedAddress: '',
            currentLat: '',
            currentLong: '',
            lastSearches: sessionStorage.getItem('lastSearches') ? JSON.parse(sessionStorage.getItem('lastSearches')) : []
        };

    }

    setInputValuesToState = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })

        if (name === 'radius') {
            this.props.getHotelsAround(this.props.api.user_geo_location, value);
        }
    };

    saveLastAddressToLocalStorage = () => {
        // Save address to local storage
        let tempArray = this.state.lastSearches;
        if (!tempArray.includes(this.state.address)) {
            tempArray.unshift(this.state.address);
            this.setState({
                lastSearches: tempArray
            });
            sessionStorage.setItem('lastSearches', JSON.stringify(this.state.lastSearches));
            console.log(this.state.lastSearches)
        }
    }
    formatAddress = () => {
        this.saveLastAddressToLocalStorage()
        return this.state.address.replace(/([^a-zA-Z0-9\s])/g, " ").toLocaleLowerCase().trim().split(' ').join('+')
    }
    detectHotels = (e) => {
        e.preventDefault();
        const formattedAddress = this.formatAddress();
        if (formattedAddress.includes('+')) {
            this.props.getHotelsAroundBasedOnLocation(formattedAddress, this.state.radius)
        }
    };

    copyAddressToState = (e) => {
        let address = e.target.innerHTML
        this.setState({
            address: address
        })
    }

    render() {
        return (
            <section>
                <form>
                    <div className={'lime-form-control'}>
                        <label htmlFor={'address'}>Search for an address (separated by spaces)</label>
                        <input type={'text'} name={'address'} id={'address'}
                               onChange={(e) => this.setInputValuesToState(e)} value={this.state.address}/>
                    </div>
                    <div className={'lime-form-control radio'}>
                        <label className={'label-text'}>Radius</label>
                        <label htmlFor={'radius1'}>500 m</label>
                        <input type={'radio'} name={'radius'} id={'radius1'}
                               onChange={(e) => this.setInputValuesToState(e)} value='500'
                               checked={this.state.radius == 500 ? true : false} disabled={this.props.api.loading}/>
                        <label htmlFor={'radius2'}>1 km</label>
                        <input type={'radio'} name={'radius'} id={'radius2'}
                               onChange={(e) => this.setInputValuesToState(e)} value='1000'
                               checked={this.state.radius == 1000 ? true : false} disabled={this.props.api.loading}/>
                        <label htmlFor={'radius3'}>2 km</label>
                        <input type={'radio'} name={'radius'} id={'radius3'}
                               onChange={(e) => this.setInputValuesToState(e)} value='2000'
                               checked={this.state.radius == 2000 ? true : false} disabled={this.props.api.loading}/>
                    </div>
                    <button onClick={this.detectHotels}>detect hotels</button>
                </form>
                {
                    this.props.api.address ? (
                        <p style={{fontSize: 12}}>Current searched
                            Address: <br/><strong>{this.props.api.address}</strong>
                        </p>) : ''
                }
                <hr/>
                <div className="last-searches-wrapper">
                    <h3>Last Searches</h3>
                    <small>click on address to copy to the search field</small>
                    {
                        this.state.lastSearches.length > 0 ? this.state.lastSearches.map((address, i) => <div key={i} onClick={(e) => this.copyAddressToState(e)}
                        >{address}</div>) : <p>You have no last searches</p>
                    }
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getLocation: (address) => dispatch(getLocation(address)),
    getHotelsAround: (address, radius) => dispatch(getHotelsAround(address, radius)),
    getHotelsAroundBasedOnLocation: (address, radius) => dispatch(getHotelsAroundBasedOnLocation(address, radius))
});
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

