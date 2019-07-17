import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import  dummyStore  from './dumm-store'
import Notes from './Notes/Notes'
import Folders from './Folders/Folders'
import './App.css';

export class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: dummyStore.folders,
      notes: dummyStore.notes
    }
  }

  render() {
    return (
      <div className="App">
        <header>
        <a href="/"><h1>Noteful</h1></a>
        </header>
        <main className="main">
          <nav className="left">
              <Route 
                path="/" exact
                render={() => <Folders folders={this.state.folders}/>}
              />
          </nav>
          <section className="right">
              <Route 
                path="/" exact
                render={() => <Notes notes={this.state.notes}/>}
              />
              <Route 
                path="/folders/:folderId"
                render={({match}) => {
                  console.log(`match is`, match);
                  return <Notes notes={this.state.notes.filter((item) => item.id === match.folderId)} /> 
                }}
              />
            <button>Add Note</button>
            <p>{dummyStore.notes.content}</p>
          </section>
        </main>
      </div>
    )
  }
}

export default App