import {TodoItem} from "./TodoItem.tsx";

type TodoItemListProps = {
    items: TodoItem[]
}
export function TodoItemList({items}: TodoItemListProps) {
    return (
        <>
            {items.map((item, index) => (
                <TodoItem key={index} item={item}></TodoItem>
            ))}
        </>
    )

}