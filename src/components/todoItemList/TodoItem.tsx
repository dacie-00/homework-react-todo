import {Fragment} from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {Checkbox} from "@/components/ui/checkbox.tsx";

type TodoItemProps = {
    item: TodoItem,
    onCheck?: (id: number, state: boolean) => void
}

export type TodoItem = {
    id: number
    task: string,
    comment: string,
    due_date: string,
    completed_at: number,
}


export function TodoItem({item, onCheck}: TodoItemProps) {
    const onCheckedChange = (state: boolean) => {
        onCheck(item, state);
    }

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
                    <Checkbox defaultChecked={item.completed_at > 0} onCheckedChange={onCheckedChange} id={"checkbox-" + String(item.id)}></Checkbox>
                    <label htmlFor={"checkbox-" + String(item.id)}>
                        Completed
                    </label>

                    <Link to={String(item.id)}>
                        <Button type="button">View</Button>
                    </Link>
                </CardContent>
            </Card>
        </Fragment>
    )

}