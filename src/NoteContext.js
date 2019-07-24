import React from 'react'

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteNotes: () => {},
    addFolders: () => {},
    addNotes: () => {}
})

export default NoteContext
