import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"

type Comment = {
    id: string
    author: string;
    content: string;
}

type CommentProps = {
    comment: Comment,
    onDelete: (comment: Comment) => void
}

export function Comment({comment, onDelete}: CommentProps) {
    return (
        <>
            <Card>
                <CardTitle>{comment.author}</CardTitle>
                <CardContent>{comment.content}</CardContent>
            </Card>
        </>
    )
}