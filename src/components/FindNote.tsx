import { Navigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { Note } from '../App'

type FindNoteProps = {
    notes: Note[]
}
export default function FindNote({ notes }: FindNoteProps) {
    const { noteID } = useParams()
    const note = notes.find(note => note.id === noteID)
    if (note) {
        return <Outlet context={note} />
    }
    else {
        return <Navigate to='/' replace />
    }
}

export function useNoteData(){
    return useOutletContext<Note>()
}