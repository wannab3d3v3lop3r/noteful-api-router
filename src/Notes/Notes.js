import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Notes.css'

export class Notes extends Component {
    render() {
        console.log(`props is`, this.props)
        console.log(this.props.notes[0].content)
        return (
            <div>
                <ul>
                    {this.props.notes.map(note => {
                        return <Link to={`/notes/${note.id}`} key={note.id} >
                                    <li className="note">
                                        <div>
                                            <h2>{note.name}</h2>
                                            <p>{note.modified}</p>
                                            <button>Delete</button>
                                        </div>
                                    </li>
                               </Link>
                    })}
                </ul>
                {this.props.notes.length === 1 ? <p>{this.props.notes[0].content}</p> : ''}
            </div>
        )
    }
}

export default Notes
