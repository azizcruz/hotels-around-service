import React, {Component} from 'react'
import './styles/style.css'
import {connect} from 'react-redux';
import {getHotelsAround, getLocation} from "../../actions/api_actions";


class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            radius: 500,
            formattedAddress: '',
            currentLat: '',
            currentLong: ''
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    setInputValuesToState = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })

        if(name === 'radius') {
            this.props.getHotelsAround(this.props.api.user_geo_location, value);
        }
    };
    formatAddress = () => {
        this.setState({
            formattedAddress: this.state.address.replace(/([^a-zA-Z0-9\s])/g, " ").toLocaleLowerCase().trim().split(' ').join('+')
        })
    }
    detectHotels = (e) => {
        e.preventDefault()
        this.formatAddress()
        console.log(this.state.formattedAddress)
    }

    changeSearchRadius = (e) => {

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
                        <p style={{fontSize: 12}}>Your address is: <br/><strong>{this.props.api.address}</strong>
                        </p>) : ''
                }
                <hr/>
                <h3>Last Searches</h3>
            </section>
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
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);

