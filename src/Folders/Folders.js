import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import propTypes from 'prop-types'
import './Folders.css'

export class Folder extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.folders.map((item) => {
                        return <Link to={`/folders/${item.id}`} key={item.id}>
                                    <li>
                                        <div className="folders">
                                            {item.name}
                                        </div>
                                    </li>
                                </Link>
                    })}
                </ul>
            </div>
        )
    }
}

Folder.propTypes = {
    folders: propTypes.arrayOf(propTypes.shape({
        id: propTypes.string.isRequired,
        name: propTypes.string.isRequired,
    }))
}

export default Folder
