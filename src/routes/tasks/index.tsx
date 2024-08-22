import {TodoItem} from "@/components/todoItemList/TodoItem.js";
import {useEffect, useState} from "react";
import {Navbar} from "@/components/navbar/index.js";
import {TodoItemList} from "@/components/todoItemList/TodoItemList.js";

export default function TasksIndex() {
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
            <div className={"m-auto w-1/2"}>
                {todoItems && <TodoItemList items={todoItems}/>}
            </div>
        </>
    )
}
