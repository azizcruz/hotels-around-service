import React from 'react';
import './App.css';

// Components Imports
import Header from './components/Header/Header'
import SearchForm from './components/SearchForm/SearchForm'
import MapContainer from './components/MapContainer/MapContainer'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <SearchForm />
        <MapContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
