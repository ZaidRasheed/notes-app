import Form from '../Form/Form'
import { NoteData, Tag } from '../../App'

type NewNoteProps = {
    createNote: (data: NoteData) => void,
    addTag: (tag: Tag) => void
    tagsList: Tag[]
}

export default function CreateNote({ createNote, addTag, tagsList }: NewNoteProps) {
    return (
        <>
            <h1>Create Note</h1>
            <Form
                onSubmit={createNote}
                addTag={addTag}
                tagsList={tagsList}
            />
        </>
    )
}
