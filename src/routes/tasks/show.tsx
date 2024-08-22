import {Task} from "@/components/taskList/Task.tsx";
import {useEffect, useState} from "react";
import {TaskList} from "@/components/taskList/TaskList.tsx";
import {useParams} from "react-router-dom";

export default function TasksIndex() {
    let { id } = useParams();
    async function getData() {
        const url = "http://localhost:3004/tasks?id=" + id;

        const response = await fetch(url);

        const json = await response.json();
        return json;
    }

    const [todoItems, setTodoItems]: Task = useState(null)

    useEffect(() => {
        getData().then((items) =>
            setTodoItems(items)
        )
    }, [])


    return (
        <>
            <div className={"m-auto w-1/2"}>
                {todoItems && <TaskList items={todoItems}/>}
            </div>
        </>
    )
}
