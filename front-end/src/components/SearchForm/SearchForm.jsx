import React, {Component} from 'react'
import './styles/style.css'

class SearchForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address: '',
            formattedAddress: ''
        }
    }

    setInputValuesToState = (event) => {
        const {value, name} = event.target
        this.setState({
            [name]: value
        })
    }
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

    render() {
        return (
            <section>
                <form>
                    <div className={'lime-form-control'}>
                        <label htmlFor={'address'}>Your address (separated by spaces)</label>
                        <input type={'text'} name={'address'} id={'address'}
                               onChange={(e) => this.setInputValuesToState(e)} value={this.state.address}/>
                    </div>
                    <button onClick={this.detectHotels}>detect hotels</button>
                </form>
                <hr />
                <h3>Last Searches</h3>
            </section>
        )
    }
}

export default SearchForm
