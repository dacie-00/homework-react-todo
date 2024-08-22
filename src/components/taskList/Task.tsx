import {Fragment, useState} from "react";
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

type TaskProps = {
    task: Task,
    onCheck: (task: Task, state: boolean) => void
    onDelete: (task: Task) => void
}

export type Task = {
    id: number
    title: string,
    comment: string,
    due_date: string,
    completed_at: number,
}


export function Task({task, onCheck, onDelete}: TaskProps) {
    const [edit, setEdit] = useState<boolean>(false)

    const onCheckedChange = (state: boolean) => {
        onCheck(task, state);
    }

    const handleDelete = () => {
        onDelete(task);
    }

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.comment || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    {!edit ? (
                        <>
                            <p>{task.due_date ? 'Due at ' + task.due_date : 'No due date'}</p>
                            <p>{task.completed_at ? 'Completed at ' + task.completed_at : ''}</p>
                            <Checkbox defaultChecked={task.completed_at > 0} onCheckedChange={onCheckedChange} id={"checkbox-" + String(task.id)}></Checkbox>
                            <label htmlFor={"checkbox-" + String(task.id)}>
                                Completed
                            </label>
                            <Button onClick={handleDelete} type="button">DELETE!</Button>

                            <Link to={String(task.id)}>
                                <Button type="button">View</Button>
                            </Link>
                        </>
                        ) : (
                        <>
                            <p>editing</p>
                        </>
                    )
                    }
                </CardContent>
            </Card>
        </Fragment>
    )

}