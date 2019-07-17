import React, { Component } from 'react'
import './Notes.css'

export class Notes extends Component {
    render() {
        return (
            <div>
                <ul>
                    {this.props.notes.map(note => {
                        return <li className="note" key={note.id}>
                                    <div>
                                        <h2>{note.name}</h2>
                                        <p>{note.modified}</p>
                                        <button>Delete</button>
                                    </div>
                               </li>
                    })}
                </ul>
            </div>
        )
    }
}

export default Notes
