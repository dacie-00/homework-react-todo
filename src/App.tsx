import {useEffect, useState} from "react";
import {TodoItemList} from "./components/todoItemList/TodoItemList.tsx";


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
        {/*{todoItems && todoItems.map((item, index) => (<div key={index}>{item.task}</div>))}*/}
        {todoItems && <TodoItemList items={todoItems} />}
    </>
    )
}

export default App
