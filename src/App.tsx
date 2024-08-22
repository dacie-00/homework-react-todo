import {useEffect, useState} from "react";
import {TodoItemList} from "./components/todoItemList/TodoItemList.tsx";
import {TodoItem} from "@/components/todoItemList/TodoItem.tsx";
import {Navbar} from "@/components/navbar";


function App() {
    async function getData() {
        const url = "http://localhost:3004/tasks";

        const response = await fetch(url);

        const json = await response.json();
        return json;
    }

    const [todoItems, setTodoItems]: TodoItem = useState(null)

    useEffect(() => {
        getData().then((items) =>
            setTodoItems(items)
        )
    }, [])


    return (
    <>
        <Navbar></Navbar>
        <div className={"m-auto w-1/2"}>
            {todoItems && <TodoItemList items={todoItems}/>}
        </div>
    </>
    )
}

export default App
