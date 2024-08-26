import {createFileRoute} from "@tanstack/react-router";
import {deleteTask, getTask, toggleTaskCompleted, updateTask} from "@/api.tsx";
import {Task} from "@/components/task/Task.tsx";

export const Route = createFileRoute('/tasks/$task_id')({
    loader: async ({params}) => await getTask(params.task_id),
    component: TasksIndex,
})

export default function TasksIndex() {
    const task = Route.useLoaderData()[0];
    console.log(task);
    return (
        <>
            <Task onCheck={toggleTaskCompleted} onDelete={deleteTask} onUpdate={updateTask} task={task}></Task>
        </>
    )
}
 