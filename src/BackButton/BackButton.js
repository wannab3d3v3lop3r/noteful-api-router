import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../Folders/Folders.css'

export class BackButton extends Component {
    render() {
        return (
            <div>
                <ul>
                    <Link to={`/`}>
                        <li>
                            <div className="folders">
                                Go back
                            </div>
                        </li>
                    </Link>
                </ul>
            </div>
        )
    }
}

export default BackButton
