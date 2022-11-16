import { useNoteData } from "../FindNote"
import { Link } from "react-router-dom"
import {
    Button,
    Col,
    Row,
    Stack,
    Badge,
    Card
} from "react-bootstrap"

import ReactMarkdown from "react-markdown"

import DeleteNoteModal from './DeleteNoteModal'

type NoteProps = {
    deleteNote: (id: string) => void
}
export default function Note({ deleteNote }: NoteProps) {

    const note = useNoteData()
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col><h1>{note.title}</h1>
                    {note.tags.length > 0 && (
                        <Stack
                            gap={1}
                            direction="horizontal"
                            className="flex-wrap mb-2"
                        >
                            {note.tags.map(tag => (
                                <Badge className="text-truncate" key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Col>
                <Col xs='auto'>
                    <Stack gap={2} direction='horizontal'>
                        <Link to={`/${note.id}/edit`}>
                            <Button variant='primary'>Edit</Button>
                        </Link>
                        <DeleteNoteModal
                            deleteNote={deleteNote}
                            id={note.id}
                        />

                        <Link to='..'>
                            <Button variant='outline-secondary'>Back</Button>
                        </Link>
                    </Stack>
                </Col>
            </Row>
            <Card className="p-4 mt-5 mb-5">
                <ReactMarkdown >
                    {note.body}
                </ReactMarkdown>
            </Card>
        </>
    )
}


