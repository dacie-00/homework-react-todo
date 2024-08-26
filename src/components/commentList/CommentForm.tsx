import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast.ts";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Button} from "@/components/ui/button.tsx";

export type CommentFormFields = {
    author: string;
    content: string;
}

export type CommentFormProps = {
    addComment: (fields: CommentFormFields) => void;
}

export function CommentForm({addComment}: CommentFormProps) {
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
        addComment(data);
    }

    return (
        <>
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
        </>
    )
}