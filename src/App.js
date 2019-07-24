import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Notes from './Notes/Notes'
import NotesWithoutLinks from './Notes/NotesWithoutLinks'
import Folders from './Folders/Folders'
import backButton from './BackButton/BackButton'
import NoteContext from './NoteContext';
import './App.css';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:9090/folders', {
      method: 'GET',
      headers: {
        'content-type': 'json/application'
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(folders => {
      this.setFolders(folders);
    })
    .catch(err => {
      console.error(err);
    })

    fetch('http://localhost:9090/notes', {
      method: 'GET',
      headers: {
        'content-type': 'json/application'
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error(res.status)
      }
      return res.json()
    })
    .then(notes => {
      this.setNotes(notes)
    })
    .catch(err => {
      console.error(err);
    })
  }

  setNotes = notes => {
    this.setState({notes})
  }

  setFolders = folders => {
    this.setState({folders})
  }

  deleteNotes = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
    })
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNotes: this.deleteNotes
    }

    return (
      <div className="App">
        <header>
          <Link to="/"><h1>Noteful</h1></Link>
        </header>
        <NoteContext.Provider value={contextValue}>
          <main className="main">
            <nav className="left">
                <Route 
                  path="/" exact
                  render={() => <Folders folders={this.state.folders}/>}
                />
                <Route 
                  path="/folders/:folderId" 
                  render={() => <Folders folders={this.state.folders}/>}
                />
                <Route 
                  path="/notes/:notesId"
                  component={backButton}
                />
            </nav>
            <section className="right">
                <Route 
                  path="/" exact
                  render={({history}) => {
                  return <Notes 
                    notes={this.state.notes}
                    goBack={() => history.push('/')}
                    />
                  }}
                />
                <Route 
                  path="/folders/:folderId"
                  render={({match, history}) => {
                  return <Notes 
                    notes={this.state.notes.filter((item) => item.folderId === match.params.folderId)}
                    goBack={() => history.push('/')} 
                  />}}
                />
                <Route
                  path="/notes/:noteId" 
                  render={({match, history}) => {
                  return <NotesWithoutLinks 
                    notes={this.state.notes.filter((item => item.id === match.params.noteId))}
                    goBack={() => history.push('/')}
                  />
                  }}
                />
            </section>
          </main>
        </NoteContext.Provider>
      </div>
    )
  }
}

export default App