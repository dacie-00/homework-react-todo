import {
    Card,
    CardContent,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";

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

    const handleDelete = () => {
        onDelete(comment)
    }

    return (
        <>
            <Card className={"p-4"}>
                <CardTitle>{comment.author}</CardTitle>
                <CardContent>{comment.content}</CardContent>
                <Button className={"bg-red-500"} onClick={handleDelete} type="button">Delete</Button>
            </Card>
        </>
    )
}