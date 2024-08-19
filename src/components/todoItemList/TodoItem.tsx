import {Fragment} from "react";

type TodoItemProps = {
    item: TodoItem
}

export type TodoItem = {
    task: string,
    comment: string,
    due_date: string,
    completed_at: string,
}

export function TodoItem({item}: TodoItemProps) {
    return (
        <Fragment>
            <p>{item.task}</p>
            <p>{item.comment}</p>
            <p>{item.due_date}</p>
            <p>{item.completed_at}</p>
        </Fragment>
    )

}