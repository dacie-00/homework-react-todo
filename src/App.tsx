import {useEffect, useState} from "react";

type TodoItem = {
    name: string,
    comment: string,
    due_date: string,
    completed_at: string,
}

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
        {todoItems && todoItems.map((item, index) => (<div key={index}>{item.name}</div>))}
    </>
    )
}

export default App
