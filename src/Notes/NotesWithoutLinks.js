import React, { Component } from 'react'
import NoteContext from '../NoteContext'
import './Notes.css'

function deleteMethod(noteId,cb){
    fetch(`http://localhost:9090/notes/${noteId}`, {
        method: 'DELETE',
        headers: {
            'content-type':'application/json'
        }
    })
    .then(res => {
        if(!res.ok){
            return res.json().then(error => {
                throw new Error(error)
            })
        }
    })
    .then(newNotes => {
        cb(newNotes)
    })
    .catch(err => {
        console.error(err);
    })
}

export class Notes extends Component {

    
    render() {
        const {notes} = this.props;
        return (
            <NoteContext.Consumer>
            {context => 
                <div>
                    <ul>
                        {notes.map(note => {
                            return <li className="note" key={note.id}>
                                        <h2>{note.name}</h2>
                                        <p>{note.modified}</p>
                                        <button 
                                            onClick={() => {
                                                deleteMethod(note.id,context.deleteNotes)
                                            }}>
                                            Delete
                                        </button>
                                    </li>
                        })}
                    </ul>
                    {notes.length === 1 ? <p>{notes[0].content}</p> : ''}
                </div>
            }
             </NoteContext.Consumer>
        )
    }
}

export default Notes
