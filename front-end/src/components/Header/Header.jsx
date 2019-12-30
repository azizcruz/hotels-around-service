import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'

class Header extends Component {
    render() {
        return (
            <header>
                <div><NavLink to={'/'}>Map</NavLink></div>
                <div><NavLink to={'/hotels'}>Found Hotels</NavLink></div>
                <div><NavLink to={'/about'}>About this app</NavLink></div>
            </header>
        )
    }
}

export default Header
