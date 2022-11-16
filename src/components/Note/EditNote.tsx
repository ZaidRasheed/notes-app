import Form from '../Form/Form'
import { NoteData, Tag } from '../../App'
import { useNoteData } from '../FindNote'

type EditNoteProps = {
    editNote: (id: string, data: NoteData) => void,
    addTag: (tag: Tag) => void
    tagsList: Tag[]
}

export default function EditNote({ editNote, addTag, tagsList }: EditNoteProps) {
    const note = useNoteData()
    return (
        <>
            <h1>Edit Note</h1>
            <Form
                title={note.title}
                body={note.body}
                tags={note.tags}
                onSubmit={data => editNote(note.id, data)}
                addTag={addTag}
                tagsList={tagsList}
            />
        </>
    )
}
