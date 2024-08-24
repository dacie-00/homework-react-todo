import {TaskList} from "@/components/taskList/TaskList.tsx";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/tasks/')({
    component: TasksIndex,
})

export default function TasksIndex() {
    return (
        <>
            <div className={"m-auto w-1/2"}>
                {<TaskList/>}
            </div>
        </>
    )
}
