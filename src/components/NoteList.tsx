import { useMemo, useState } from "react"
import {
    Button,
    Col,
    Form,
    Row,
    Stack,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import ReactSelect from 'react-select/creatable'
import { Note, Tag } from '../App'
import NoteCard from './Note/NoteCard'
import EditTagsModal from './EditTagsModal'
type NoteListProps = {
    notes: Note[]
    tagsList: Tag[]
    deleteTag: (id: string) => void
    editTag: (id: string, label: string) => void
}

export default function NoteList({ notes, tagsList, editTag, deleteTag }: NoteListProps) {

    const [title, setTitle] = useState<string>('')
    const [tags, setTags] = useState<Tag[]>([])


    const listOfNotes = useMemo(() => {
        return notes.filter(note => {
            return (
                (!title.length || note.title.toLowerCase().includes(title.toLowerCase())) &&
                (tags.length === 0 || tags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            )
        })
    }, [title, tags, notes])

    return (
        <>
            <Row>
                <Col>
                    <h1>Notes</h1>
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to='/new'>
                            <Button variant='primary'>Create Note</Button>
                        </Link>
                        <EditTagsModal
                            editTag={editTag}
                            deleteTag={deleteTag}
                            tagsList={tagsList}
                        />
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className='mb-3'>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type='text'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                options={tagsList.map((tag: Tag) => {
                                    return { value: tag.id, label: tag.label }
                                })}
                                value={tags.map(tag => {
                                    return { value: tag.id, label: tag.label }
                                })}
                                onChange={tags => {
                                    setTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                noOptionsMessage={() => null}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row className='g-3 mt-4' >
                {listOfNotes.map(note => {
                    return (
                        <Col xs={12} sm={6} lg={4} xl={4} key={note.id}>
                            <NoteCard
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                            />
                        </Col>
                    )
                })}
            </Row>
        </>
    )
}
