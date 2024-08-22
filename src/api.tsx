import {Task} from "@/components/taskList/Task.tsx";


export const getTasks = async () => {
    const url = "http://localhost:3004/tasks";

    const response = await fetch(url);

    const json = await response.json();
    return json;
}

export const updateTask = (task: Task) => {
    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
}

export const addTask = async (task) => {
    return fetch('http://localhost:3004/tasks/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(task => task)
}

export const toggleTaskCompleted = (task: Task, state: boolean) => {
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

export const deleteTask = (task: Task) => {
    fetch('http://localhost:3004/tasks/' + task.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
}
