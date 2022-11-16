import { useState } from 'react'
import {
    Button,
    Modal
} from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
type DeleteModalProps = {
    deleteNote: (id: string) => void,
    id: string
}

export default function DeleteNoteModal({ deleteNote, id }: DeleteModalProps) {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    function handleDelete() {
        deleteNote(id);
        navigate('/')
    }
    return (
        <>
            <Button variant='danger' onClick={() => setShowModal(true)}>Delete</Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Note?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
