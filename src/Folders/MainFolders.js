import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Folders.css'

export class Folder extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.folders.map((item) => {
                        return <li key={item.id}>
                                    <div className="folders">
                                        <Link to={`/folders/${item.id}`}>
                                            {item.name}
                                        </Link>
                                    </div>
                                </li>
                    })}
                </ul>
                <button className="btn" type="button">Add Folder</button>
            </div>
        )
    }
}

export default Folder
