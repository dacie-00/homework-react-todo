import {useEffect, useState} from "react";
import {TaskList} from "@/components/taskList/TaskList.tsx";
import {Task} from "@/components/taskList/Task.tsx";
import {Navbar} from "@/components/navbar";


function App() {
    async function getData() {
        const url = "http://localhost:3004/tasks";

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
        <Navbar></Navbar>
        <div className={"m-auto w-1/2"}>
            {todoItems && <TaskList items={todoItems}/>}
        </div>
    </>
    )
}

export default App
