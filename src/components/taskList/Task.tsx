import {ChangeEvent, Fragment, useState} from "react";
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
import {Input} from "@/components/ui/input.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {DatePickerWithPresets} from "@/components/ui/date-picker.tsx";

type TaskProps = {
    task: Task,
    onCheck: (task: Task, state: boolean) => void
    onDelete: (task: Task) => void
    onUpdate: (task: Task) => void
}

export type Task = {
    id: number
    title: string,
    comment: string,
    due_date: string,
    completed_at: number,
}


export function Task({task, onCheck, onDelete, onUpdate}: TaskProps) {
    const [edit, setEdit] = useState<boolean>(false)
    const [currentTask, setCurrentTask] = useState(task)
    const [backupTask, setBackupTask] = useState(task)

    const onCheckedChange = (state: boolean) => {
        onCheck(currentTask, state);
    }

    const handleDelete = () => {
        onDelete(currentTask);
    }

    const handleUpdate = () => {
        onUpdate(currentTask);
        setEdit(false);
        setBackupTask(currentTask)
    }

    const updateProperty = (e: ChangeEvent) => {
        setCurrentTask({...currentTask, [e.target.name]: e.target.value})
    }
    const updateDueDate = (date: Date) => {
        setCurrentTask({...currentTask, 'due_date': date.toDateString()})
    }

    const cancelUpdate = () => {
        setCurrentTask(backupTask);
        setEdit(false)
    }

    const id = String(currentTask.id)

    return (
        <Fragment>
            <Card>
                <CardHeader>
                    <CardTitle>{currentTask.title}</CardTitle>
                    <CardDescription>{currentTask.comment || 'No description'}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>{currentTask.due_date ? 'Due at ' + currentTask.due_date : 'No due date'}</p>
                    <p>{currentTask.completed_at ? 'Completed at ' + currentTask.completed_at : ''}</p>
                    <Checkbox defaultChecked={currentTask.completed_at > 0} onCheckedChange={onCheckedChange}
                              id={"checkbox-completed-" + id}></Checkbox>
                    <label htmlFor={"checkbox-completed-" + id}>
                        Completed
                    </label>
                    {edit ? (
                        <>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`title-${id}`}>Title</Label>
                                <Input id={`title-${id}`} type={"text"} name={'title'} value={currentTask.title}
                                       onChange={updateProperty}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Label htmlFor={`comment-${id}`}>Comment</Label>
                                <Input id={`comment-${id}`} type={"text"} name={'comment'} value={currentTask.comment}
                                       onChange={updateProperty}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Calendar mode={"single"} selected={currentTask.due_date} name={'due_date'} onSelect={updateDueDate}/>
                            </div>
                            <Button onClick={handleUpdate} type="button">Submit changes</Button>
                            <Button onClick={cancelUpdate} type="button">Cancel changes</Button>
                        </>
                    ) : (
                        <Button onClick={() => setEdit(!edit)}id={"button-edit-" + String(currentTask.id)}>Edit</Button>
                    )
                    }
                    <Button onClick={handleDelete} type="button">DELETE!</Button>

                    <Link to={String(currentTask.id)}>
                        <Button type="button">View</Button>
                    </Link>


                </CardContent>
            </Card>
        </Fragment>
    )

}