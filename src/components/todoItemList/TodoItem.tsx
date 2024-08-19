import {Fragment} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type TodoItemProps = {
    item: TodoItem
}

export type TodoItem = {
    task: string,
    comment: string,
    due_date: string,
    completed_at: string,
}

export function TodoItem({item}: TodoItemProps) {
    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>{item.task}</CardTitle>
                    <CardDescription>{item.comment || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{item.due_date ? 'Due at ' + item.due_date : 'No due date'}</p>
                    <p>{item.completed_at ? 'Completed at ' + item.completed_at : ''}</p>
                </CardContent>
            </Card>
        </Fragment>
    )

}