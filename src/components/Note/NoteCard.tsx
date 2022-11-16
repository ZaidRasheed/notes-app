import {
    Badge,
    Card,
    Stack,
} from "react-bootstrap"
import { Link } from "react-router-dom"
import { Tag } from '../../App'

import styles from './ListStyles.module.css'


type NoteCardProps = {
    id: string,
    title: string,
    tags: Tag[]
}
export default function NoteCard({ id, title, tags }: NoteCardProps) {
    return (
        <Card as={Link} to={`/${id}`} className={`h-100 text-rest text-decoration-none ${styles.card}`}>
            <Card.Body>
                <Stack
                    gap={2}
                    className="align-items-center justify-content-center h-100"
                >
                    <span className="fs-3">{title}</span>
                    {tags.length > 0 && (

                        <Stack
                            gap={1}
                            direction="horizontal"
                            className="justify-content-center flex-wrap"
                        >
                            {tags.map(tag => (
                                <Badge className="text-truncate" key={tag.id}>
                                    {tag.label}
                                </Badge>
                            ))}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}