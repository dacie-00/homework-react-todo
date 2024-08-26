import {Task} from "./Task.tsx";
import {updateTask, getTasks, toggleTaskCompleted, addTask, deleteTask, getComments} from "@/api.tsx";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/components/ui/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";

export function TaskList() {
    const queryClient = useQueryClient();

    const fetchTasks = async () => {
        let tasks = await getTasks();
        tasks = await Promise.all(tasks.map(async (task) => {
            task.comment_count = (await getComments(task)).length
            return task;
        }));
        return tasks;
    }

    const query = useQuery({queryKey: ['tasks'], queryFn: fetchTasks})

    const addMutation = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks']})
            toast({
                title: 'Task added',
                description: 'Your task has been added',
                duration: 2000,
            })
        }
    });
    const handleAdd = () => {
        const task = {
            'title': 'untitled',
            'comment': '',
            'due_date': '',
            'completed_at': '',
        }
        addMutation.mutate(task);
    }

    const deleteMutation = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks']})
            toast({
                title: 'Task deleted',
                description: 'Your task has been deleted',
                duration: 2000,
            })
        }
    });
    const handleDelete = (task: Task) => {
        deleteMutation.mutate(task);
    }

    const updateMutation = useMutation({
        mutationFn: updateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks']});
            toast({
                title: 'Task updated',
                description: 'Your task has been updated',
                duration: 2000,
            })
        }
    });
    const handleUpdate = (task: Task) => {
        updateMutation.mutate(task);
    }


    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: ['tasks']})
    }, [])

    return (
        <>
            {query.data?.map((task) => (
                <Task key={task.id} task={task} onCheck={toggleTaskCompleted} onUpdate={handleUpdate} onDelete={handleDelete}/>
            ))}
            <div className={"flex flex-col items-center mt-4"}>
                <Button onClick={handleAdd}>Add new task</Button>
            </div>
            <Toaster></Toaster>
        </>
    )

}