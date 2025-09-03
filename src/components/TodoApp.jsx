import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import FilterDropdown from "./FilterDropdown";
import AddTaskModal from "./AddTaskModal";
import "../styles/TodoApp.css";
import { FaSearch } from "react-icons/fa";



export default function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    const newTask = { id: Date.now(), text, completed: false };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => setTasks(tasks.filter((t) => t.id !== id));

  const toggleTask = (id) =>
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const filteredTasks = tasks
    .filter((t) =>
      filter === "active" ? !t.completed : filter === "completed" ? t.completed : true
    )
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="todo-container">
      <h1 className="todo-title">TODO LIST</h1>
      <div className="todo-topbar">
        <span><FaSearch className="search-icon" /> </span>
        <input
          className="todo-search"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterDropdown filter={filter} setFilter={setFilter} />
      </div>
      <TodoList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} />
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>＋</button>
      {isModalOpen && (
        <AddTaskModal
          onClose={() => setIsModalOpen(false)}
          onAdd={addTask}
        />
      )}
    </div>
  );
}
