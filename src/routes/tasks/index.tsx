import {Task} from "@/components/taskList/Task.tsx";
import {useEffect, useState} from "react";
import {TaskList} from "@/components/taskList/TaskList.tsx";

export default function TasksIndex() {




    return (
        <>
            <div className={"m-auto w-1/2"}>
                {<TaskList/>}
            </div>
        </>
    )
}
