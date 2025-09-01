import React from "react";
import { FaTrash } from "react-icons/fa";
import "../styles/TodoItem.css";

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <li className={`todo-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        <FaTrash />
      </button>
    </li>
  );
}
