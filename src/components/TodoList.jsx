import React from "react";
import TodoItem from "./TodoItem";
import "../styles/TodoList.css";

export default function TodoList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0)
    return <p className="no-task">No tasks found</p>;

  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
