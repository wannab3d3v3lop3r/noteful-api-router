import React from 'react';
// import {Route} from 'react-router-dom'
// import MainPage from './MainPage/MainPage'
import  dummyStore  from './dumm-store'
import './App.css';


function App() {
  return (
    <div className="App">
        <header>
          <a href="/"><h1>Noteful</h1></a>
        </header>
        <main class="main">
          <nav class="left">
            <div class="folders">
              <a href="/">{dummyStore.folders[0].name}</a>
            </div>
            <div class="folders">
              <a href="/">{dummyStore.folders[1].name}</a>
            </div>
            <div class="folders">
              <a href="/">{dummyStore.folders[2].name}</a>
            </div>
            <button class="btn" type="button">Add Folder</button>
          </nav>
          <section class="right">
            <ul>
              {dummyStore.notes.map(note => {
                return <li class="note">
                          <div>
                            <h2>{note.name}</h2>
                            <p>{note.modified}</p>
                            <button>Delete</button>
                          </div>
                        </li>
                })
              }
            </ul>
          <button>Add Note</button>
          <p>{dummyStore.notes.content}</p>
        </section>
      </main>
    </div>
  );
}

export default App;
