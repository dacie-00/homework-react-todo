import {Task} from "./Task.tsx";
import {deleteTask, updateTask, getTasks, toggleTaskCompleted} from "@/api.tsx";
import {useEffect, useState} from "react";

export function TaskList() {
    const [tasks, setTasks]: Task = useState(null)

    const handleDelete = (taskToDelete: Task) => {
        deleteTask(taskToDelete)
        setTasks(tasks.filter(task => task.id !== taskToDelete.id));
    }

    const handleUpdate = (taskToUpdate: Task) => {
        updateTask(taskToUpdate)
    }

    useEffect(() => {
        getTasks().then((tasks) =>
            setTasks(tasks)
        )
    }, [])

    return (
        <>
            {tasks && tasks.map((task, index) => (
                <Task key={index} task={task} onCheck={toggleTaskCompleted} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
        </>
    )

}