import {Task} from "./Task.tsx";
import {deleteTask, getTasks, toggleTaskCompleted} from "@/api.tsx";
import {useEffect, useState} from "react";

export function TaskList() {
    const [tasks, setTasks]: Task = useState(null)

    useEffect(() => {
        getTasks().then((tasks) =>
            setTasks(tasks)
        )
    }, [tasks])

    return (
        <>
            {tasks && tasks.map((task, index) => (
                <Task key={index} task={task} onCheck={toggleTaskCompleted} onDelete={deleteTask}/>
            ))}
        </>
    )

}