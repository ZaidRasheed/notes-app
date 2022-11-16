import { FormEvent, useRef, useState } from 'react'
import { Form, Stack, Row, Col, Button } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import { Link, useNavigate } from 'react-router-dom'
import { NoteData, Tag } from '../../App'
import { v4 as uuidV4 } from 'uuid'

type NoteFormProps = {
    onSubmit: (data: NoteData) => void,
    addTag: (tag: Tag) => void,
    tagsList: Tag[]
} & Partial<NoteData>


export default function NoteForm({ onSubmit, addTag, tagsList, title = "", body = "", tags = [] }: NoteFormProps) {

    const titleRef = useRef<HTMLInputElement>(null)
    const bodyRef = useRef<HTMLTextAreaElement>(null)

    const navigate = useNavigate()
    const [chosenTags, setChosenTags] = useState<Tag[]>(tags)
    console.log(chosenTags)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tags: chosenTags
        })
        navigate('..')
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='tittle'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref={titleRef} required defaultValue={title}></Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect

                                onCreateOption={label => {
                                    const newTag = {
                                        id: uuidV4(),
                                        label: label
                                    }
                                    addTag(newTag)
                                    setChosenTags(prev => {
                                        return [...prev, newTag]
                                    })
                                }}
                                value={chosenTags.map(tag => {
                                    return { value: tag.id, label: tag.label }
                                })}
                                options={tagsList.map((tag: Tag) => {
                                    return { value: tag.id, label: tag.label }
                                })}
                                onChange={tags => {
                                    setChosenTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={bodyRef} required as='textarea' rows={15} defaultValue={body}></Form.Control>
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to='..'>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>
        </Form>
    )
}
