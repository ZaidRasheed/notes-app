import { useMemo } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap';
import { Routes, Route, Navigate } from 'react-router-dom'
import CreateNote from './components/Note/CreateNote';
import NoteList from './components/NoteList';
import { v4 as uuidV4 } from 'uuid'
import useLocalStorage from './Hooks/UseLocalStorage';
import FindNote from './components/FindNote';
import Note from './components/Note/Note';
import EditNote from './components/Note/EditNote';
export type Note = {
  id: string
} & NoteData

export type NoteData = {
  title: string,
  body: string,
  tags: Tag[]
}

//  ! same as NoteData except that we only store the ids for the tags so when we update the tag value
// !-> we dont want to go through each note tags
export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  body: string,
  tagsIds: string[]
}

export type Tag = {
  id: string,
  label: string
}


function App() {

  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])


  const fullNotes = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagsIds.includes(tag.id)) }
    })
  }, [notes, tags])

  function createNote({ tags, ...data }: NoteData) {
    setNotes(prev => {
      return [...prev, { ...data, id: uuidV4(), tagsIds: tags.map(tag => tag.id) }]
    })
  }

  function addTag(tag: Tag) {
    setTags(prev => {
      return [...prev, tag]
    })
  }

  function editNote(id: string, { tags, ...data }: NoteData) {
    console.log(tags)
    setNotes(prev => {
      return prev.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map(tag => tag.id) }
        }
        else {
          return note
        }
      })
    })
  }

  function deleteNote(id: string) {
    setNotes(prev => {
      return prev.filter(note => note.id !== id)
    })
  }

  function deleteTag(id: string) {
    setTags(prev => {
      return prev.filter(tag => tag.id !== id)
    })
  }

  function editTag(id: string, label: string) {
    setTags(prev => {
      return prev.map(tag => {
        if (tag.id === id) {
          return { id: id, label: label }
        }
        else return tag
      })
    })
  }

  return (
    <Container className='m-auto mt-4' style={{ maxWidth: '900px' }}>
      <Routes>
        <Route path='/' element={<NoteList
          notes={fullNotes}
          tagsList={tags}
          deleteTag={deleteTag}
          editTag={editTag}
        />} />
        <Route path='/new' element={
          <CreateNote
            createNote={createNote}
            addTag={addTag}
            tagsList={tags} />
        } />
        <Route path='/:noteID' element={
          <FindNote
            notes={fullNotes} />
        }>
          <Route index element={
            <Note
              deleteNote={deleteNote} />
          } />
          <Route path='edit' element={
            <EditNote
              editNote={editNote}
              addTag={addTag}
              tagsList={tags} />
          } />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
