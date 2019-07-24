import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import Notes from './Notes/Notes'
import NotesWithoutLinks from './Notes/NotesWithoutLinks'
import Folders from './Folders/Folders'
import backButton from './BackButton/BackButton'
import NoteContext from './NoteContext';
import AddFolder from './AddFolder/AddFolder'
import AddNotes from './AddNotes/AddNotes'
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
    this.fetchFolders();
    this.fetchNotes();
  }

  fetchFolders = () => {
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
  }

  fetchNotes = () => {
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

  addFolders = newFolder => {
    console.log(newFolder)
    this.setState({folders: [...this.state.folders, newFolder]})
    this.fetchFolders();
  }

  addNotes = newNotes => {
    this.setState({notes: [...this.state.notes, newNotes]})
    this.fetchNotes();
  }

  deleteNotes = noteId => {
    const newNotes = this.state.notes.filter(note => note.id !== noteId)
    this.setState({
      notes: newNotes
  })

    this.fetchNotes();
  }

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNotes: this.deleteNotes,
      addNotes: this.addNotes,
      addFolders: this.addFolders
    }

    return (
      <div className="App">
        <header>
            <Link to="/"><h1>Noteful</h1></Link>
            <div class="">
              <Link to="/addNotes">
                <p class>Add Note</p>
              </Link>
              <Link to='/addFolder'>
                <p>Add Folder</p>
              </Link>
          </div>
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
                <Route 
                  path="/addFolder"
                  component={backButton}
                />
                <Route 
                  path="/addNotes"
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
                <Route 
                  path="/addFolder"
                  component={AddFolder}
                />
                  <Route 
                  path="/addNotes"
                  component={AddNotes}
                />
            </section>
          </main>
        </NoteContext.Provider>
      </div>
    )
  }
}

export default App