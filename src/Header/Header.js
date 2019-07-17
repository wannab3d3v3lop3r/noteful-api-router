import React, { Component } from 'react'
import './Header.css'

export class Header extends Component {
    render() {
        return (
            <header>
                <a href="/"><h1>Noteful</h1></a>
            </header>
        )
    }
}

export default Header
