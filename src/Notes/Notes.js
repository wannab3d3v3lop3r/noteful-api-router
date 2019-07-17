import React, { Component } from 'react'
import './Notes.css'

export class Notes extends Component {
    render() {
        return (
            <div class="folders">
              <a href="/">{this.props.folders.name}</a>
            </div>
        )
    }
}

export default Notes
