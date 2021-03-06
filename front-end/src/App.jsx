import React, {Component} from 'react';
import './App.css';
// Components Imports
import Header from './components/Header/Header'
import SearchForm from './components/SearchForm/SearchForm'
import Footer from './components/Footer/Footer'
import MapContainer from "./components/MapContainer/MapContainer";
import Hotels from "./components/Hotels/Hotels";
import About from "./components/About/About"
// Redux Imports
import {connect} from 'react-redux';
import {getLocation} from './actions/api_actions';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

class App extends Component {

    render() {
        return (<div className="App">
            <Router>
                <Header/>
                <main>
                    <section>
                        <SearchForm/>
                    </section>

                    <section>
                        <Switch>
                            <Route exact path='/' component={MapContainer}/>
                            <Route path='/hotels' component={Hotels}/>
                            <Route path='/about' component={About}/>
                        </Switch>
                    </section>
                </main>
            </Router>
            <Footer/>
        </div>)
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getLocation: (address) => dispatch(getLocation(address))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
