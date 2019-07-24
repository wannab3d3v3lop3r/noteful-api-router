import React, { Component } from 'react'
import NoteContext from '../NoteContext'

export class AddNotes extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            content: '',
            folderId: ''
        }
    }

    updateNoteName = name => {
        this.setState({name})
    }

    updateNoteContent = content => {
        this.setState({content})
    }

    updateFolderId = folderId => {
        this.setState({folderId})
    }    

    onHandleSubmit = (e,cb) => {
        e.preventDefault();
        console.log(this.state.name);
        console.log(this.state.content);
        console.log(this.state.folderId);
        fetch('http://localhost:9090/notes', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({
                name: this.state.name, 
                content: this.state.content,
                modified: new Date(),
                folderId: this.state.folderId
            })
        })
        .then(res => {
            if(!res.ok){
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(notes => {
            cb(notes)
            this.props.history.push('/')
        })
        .catch(err => {
            console.error(err);
        })
    }
    render() {
        return (
            <NoteContext.Consumer>
            {context => 
                <div>
                    <h1>Add Notes</h1>
                    <form onSubmit={e => this.onHandleSubmit(e, context.addNotes)}>
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" onChange={e => this.updateNoteName(e.target.value)}></input>
                        <label htmlFor="content">Content: </label>
                        <input id="content" type="text" onChange={e => this.updateNoteContent(e.target.value)}></input>
                        <select onChange={e => this.updateFolderId(e.target.value)}> 
                        {context.folders.map(item => {
                            return <option key={item.id} value={item.id}>{`${item.name}`}</option>
                        })}
                        </select>
                        <button type="submit">Submit</button>
                    </form>   
                </div> 
            }
            </NoteContext.Consumer>
        )
    }
}

export default AddNotes
