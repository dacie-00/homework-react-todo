import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './globals.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import TasksIndex from './routes/tasks/index.tsx'
import TasksShow from './routes/tasks/show.tsx'
import {TodoItem} from "@/components/todoItemList/TodoItem.tsx";

const toggleTaskCompleted = (task: TodoItem, state: boolean) => {
    let completed_at = 0;
    if (state) {
        completed_at = Date.now()
    }

    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "completed_at": completed_at }),
    })
}

const deleteTask = (task: TodoItem) => {
    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "tasks",
                element: <TasksIndex toggleTaskCompleted={toggleTaskCompleted}/>
            },
            {
                path: "tasks/:id",
                element: <TasksShow/>
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);