import { useState } from 'react'
import {
    Button,
    Modal,
    Form,
    Stack,
    Row,
    Col,
} from "react-bootstrap"
import { Tag } from '../App'

type EditModalProps = {
    editTag: (id: string, label: string) => void
    deleteTag: (id: string) => void
    tagsList: Tag[],
}
export default function EditTagsModal({ editTag, deleteTag, tagsList }: EditModalProps) {
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <Button variant='outline-secondary' onClick={() => setShowModal(true)}>Edit Tags</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Stack gap={2}>
                            {tagsList.map((tag: Tag) => (
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            value={tag.label}
                                            onChange={e => editTag(tag.id, e.target.value)}
                                        />
                                    </Col>
                                    <Col xs="auto">
                                        <Button
                                            onClick={() => deleteTag(tag.id)}
                                            variant="outline-danger"
                                        >
                                            &times;
                                        </Button>
                                    </Col>
                                </Row>
                            ))}
                        </Stack>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
