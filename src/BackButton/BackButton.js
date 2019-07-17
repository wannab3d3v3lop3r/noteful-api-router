import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import '../Folders/Folders.css'

export class Folder extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.folders.map((item) => {
                        return <Link to={`/note/${item.id}`}>
                                    <li key={item.id}>
                                        <div className="folders">
                                            
                                                {item.name}
                                            
                                        </div>
                                    </li>
                                </Link>
                    })}
                </ul>
                <button className="btn" type="button">Add Folder</button>
            </div>
        )
    }
}

export default Folder
