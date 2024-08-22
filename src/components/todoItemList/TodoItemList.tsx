import {TodoItem} from "./TodoItem.tsx";

type TodoItemListProps = {
    items: TodoItem[]
    toggleTaskCompleted: (task: TodoItem, state: boolean) => void
}
export function TodoItemList({items, toggleTaskCompleted}: TodoItemListProps) {
    return (
        <>
            {items.map((item, index) => (
                <TodoItem key={index} item={item} onCheck={toggleTaskCompleted} />
            ))}
        </>
    )

}