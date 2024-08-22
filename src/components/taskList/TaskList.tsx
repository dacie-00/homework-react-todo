import {Task} from "./Task.tsx";
import {updateTask, getTasks, toggleTaskCompleted, addTask, deleteTask} from "@/api.tsx";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";

export function TaskList() {
    const [tasks, setTasks] = useState([])<Task[]>

    const handleDelete = (taskToDelete: Task) => {
        deleteTask(taskToDelete);
        setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    }

    const handleUpdate = (taskToUpdate: Task) => {
        updateTask(taskToUpdate);
    }

    const handleAdd = () => {
        const task = {
            'title': 'untitled',
            'comment': '',
            'due_date': '',
            'completed_at': '',
        }
        addTask(task).then(task => setTasks([...tasks, task]));
    }

    useEffect(() => {
        getTasks().then((tasks) =>
            setTasks(tasks)
        )
    }, [])

    return (
        <>
            {tasks && tasks.map((task) => (
                <Task key={task.id} task={task} onCheck={toggleTaskCompleted} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
            <Button className={"m-auto"} onClick={handleAdd}>Add new task</Button>
        </>
    )

}