import React from 'react';
import './App.css';
// Components Imports
import Header from './components/Header/Header'
import SearchForm from './components/SearchForm/SearchForm'
import Footer from './components/Footer/Footer'
import MapContainer from "./components/MapContainer/MapContainer";
import Recommendations from "./components/Recommendations/Recommendations";


import { Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Header/>
            <main>
                <section>
                    <SearchForm/>
                </section>
                <section>
                    <Switch>
                        <Route exact path='/' component={MapContainer}/>
                        <Route path='/recommendations' component={Recommendations}/>
                    </Switch>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default App;
