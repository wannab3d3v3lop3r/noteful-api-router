import React from 'react'

const NoteContext = React.createContext({
    folders: [],
    notes: [],
    deleteNotes: () => {}
})

export default NoteContext
