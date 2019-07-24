import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NoteContext from '../NoteContext'
import './Notes.css'

function deleteMethod(noteId,cb,homePage){
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
        homePage();
    })
    .catch(err => {
        console.error(err);
    })
}

export class Notes extends Component {
    render() {
        const {notes, goBack} = this.props;
        console.log(this.props);
        return (
            <NoteContext.Consumer>
                {context => 
                    <div>
                        <ul>
                            {notes.map(note => {
                                return <li className="note" key={note.id}>
                                            <Link to={`/notes/${note.id}`}> 
                                                <h2>{note.name}</h2>
                                            </Link>
                                            <p>{note.modified}</p>
                                            <button 
                                                onClick={() => {
                                                    deleteMethod(note.id,context.deleteNotes,goBack)
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </li>
                            })}
                        </ul>
                        <button>Add Note</button>
                    </div>
                }
            </NoteContext.Consumer>
        )
    }
}

Notes.defaultProps = {
    deleteMethod: () => {}
}

export default Notes
