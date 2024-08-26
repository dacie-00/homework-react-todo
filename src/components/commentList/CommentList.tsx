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
    const handleAdd = (author, content) => {
        const comment = {
            'author': author,
            'content': content,
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

    const FormSchema = z.object({
        author: z
            .string()
            .min(4, {
                message: "author name must be at least 4 characters.",
            })
            .max(30, {
                message: "author name must not be longer than 30 characters.",
            }),
        content: z
            .string()
            .min(10, {
                message: "comment must be at least 10 characters.",
            })
            .max(200, {
                message: "comment must not be longer than 200 characters.",
            }),
    })
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        handleAdd(data.author, data.content);
        console.log("foo");
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
            ),
        })
    }

    return (
        <>
            {query.data?.map((comment) => (
                <Comment key={comment.id} comment={comment} onDelete={handleDelete}/>
            ))}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="author"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Author</FormLabel>
                                <FormControl>
                                    <Input
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="content"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Comment</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Write something nice to the TODO item author"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Send comment</Button>
                </form>
            </Form>

            <Toaster></Toaster>
        </>
    )
}