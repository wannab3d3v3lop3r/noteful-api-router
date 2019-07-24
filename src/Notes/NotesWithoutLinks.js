import React, { Component } from 'react'
import './Notes.css'

export class Notes extends Component {
    render() {
        const {notes} = this.props;
        return (
            <div>
                <ul>
                    {notes.map(note => {
                        return <li className="note" key={note.id}>
                                    <h2>{note.name}</h2>
                                    <p>{note.modified}</p>
                                    <button>Delete</button>
                                </li>
                    })}
                </ul>
                {notes.length === 1 ? <p>{notes[0].content}</p> : ''}
            </div>
        )
    }
}

export default Notes
