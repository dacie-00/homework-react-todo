import {Comment} from "./Comment.tsx";
import {addComment, deleteComment, getComments} from "@/api.tsx";
import {useEffect} from "react";
import {Button} from "@/components/ui/button.tsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {toast} from "@/components/ui/use-toast.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Input} from "@/components/ui/input.tsx";
import {CommentForm, CommentFormFields} from "@/components/commentList/CommentForm.tsx";

type CommentListProps = {
    task: Task,
}

export function CommentList({task}: CommentListProps) {
    const queryClient = useQueryClient();

    const fetchTasks = async () => await getComments(task)

    const query = useQuery({queryKey: ['comments'], queryFn: fetchTasks})

    const addMutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']})
            toast({
                title: 'Comment added',
                description: 'Your comment has been added',
                duration: 2000,
            })
        }
    });
    const handleAdd = (fields: CommentFormFields) => {
        const comment = {
            'author': fields.author,
            'content': fields.content,
            'task_id': task.id,
        }
        addMutation.mutate(comment);
    }

    const deleteMutation = useMutation({
        mutationFn: deleteComment,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['comments']})
            toast({
                title: 'Comment deleted',
                description: 'The comment has been deleted',
                duration: 2000,
            })
        }
    });
    const handleDelete = (comment: Comment) => {
        deleteMutation.mutate(comment);
    }

    useEffect(() => {
        queryClient.invalidateQueries({queryKey: ['comments']})
    }, [])

    return (
        <>
            <div className={"space-y-3 mb-8"}>
                {query.data?.map((comment) => (
                    <Comment key={comment.id} comment={comment} onDelete={handleDelete}/>
                ))}
            </div>

            <CommentForm addComment={handleAdd}></CommentForm>

            <Toaster></Toaster>
        </>
    )
}