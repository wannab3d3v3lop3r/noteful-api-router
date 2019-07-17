import React, { Component } from 'react'
import './Folder.css'

export class Folder extends Component {
    render() {
        return (
            <div class="folders">
              <a href="/">{this.props.folders}</a>
            </div>
        )
    }
}

export default Folder
