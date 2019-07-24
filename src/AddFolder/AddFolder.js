import React, { Component } from 'react'
import NoteContext from '../NoteContext'

export class AddFolder extends Component {
    constructor(){
        super()
        this.state = {
            name: ''
        }
    }

    nameSubmitted = name => {
        this.setState({name})
    }

    onHandleSubmit = (e,cb) => {
        e.preventDefault();
        console.log(this.state.name);
        fetch('http://localhost:9090/folders', {
            method: 'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({name: this.state.name})
        })
        .then(res => {
            if(!res.ok){
                throw new Error(res.status)
            }
            return res.json()
        })
        .then(folders => {
            cb(folders)
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
                    <h1>Add Folder</h1>
                    <form onSubmit={e => this.onHandleSubmit(e, context.addFolders)}>
                        <label htmlFor="name">Name: </label>
                        <input id="name" type="text" onChange={e => this.nameSubmitted(e.target.value)}></input>
                        <button type="submit">Submit</button>
                    </form>   
                </div> 
            }
            </NoteContext.Consumer>
        )
    }
}

export default AddFolder
