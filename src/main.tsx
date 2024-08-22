import * as React from "react";
import * as ReactDOM from "react-dom/client";
import './globals.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from './routes/root.tsx'
import ErrorPage from './error-page.tsx'
import TasksIndex from './routes/tasks/index.tsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "tasks",
                element: <TasksIndex/>
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);