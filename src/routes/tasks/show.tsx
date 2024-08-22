import {TodoItem} from "@/components/todoItemList/TodoItem.js";
import {useEffect, useState} from "react";
import {TodoItemList} from "@/components/todoItemList/TodoItemList.js";
import {useParams} from "react-router-dom";

export default function TasksIndex() {
    let { id } = useParams();
    async function getData() {
        const url = "http://localhost:3004/tasks?id=" + id;

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
