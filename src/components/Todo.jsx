import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import "./Todo.css";


export default function Todo() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState("All"); // all | active | completed
  const [search, setSearch] = useState(""); // search query
  const [isModalOpen, setIsModalOpen] = useState(false); // modal state
  const [newTaskText, setNewTaskText] = useState(""); // input value

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task from modal
  const handleAddTask = () => {
    if (!newTaskText.trim()) return;

    const newTask = {
      id: Date.now(),
      text: newTaskText.trim(),
      completed: false,
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskText(""); // reset input
    setIsModalOpen(false); // close modal
  };

  // Delete task
  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle completed
  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter + Search
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "active") return !task.completed;
      if (filter === "completed") return task.completed;
      return true;
    })
    .filter((task) =>
      task.text.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="app">
      {/* Header */}
      <header>
        <h1 className="title">TODO LIST</h1>
      </header>

      {/* Top bar */}
      <section className="top-bar">
        <span><FaSearch className="search-icon" /> </span>
        <input
          type="text"
          placeholder="Search tasks..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="dropdown">
          <button className="filter-btn">{filter} ▾</button>
          <ul className="dropdown-menu">
            <li onClick={() => setFilter("All")}>All</li>
            <li onClick={() => setFilter("active")}>Incomplete</li>
            <li onClick={() => setFilter("completed")}>Complete</li>
          </ul>
        </div>
      </section>

      {/* Task list */}
      <main>
        <ul className="task-list">
          {filteredTasks.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>
              No tasks found
            </p>
          ) : (
            filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`task ${task.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggle(task.id)}
                />
                <span>{task.text}</span>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  <FaTrash />
                </button>
              </li>
            ))
          )}
        </ul>
      </main>

      {/* Add Task Button */}
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        ＋
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h2>Add New Task</h2>
            <input
              type="text"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              placeholder="Enter task..."
            />
            <div className="modal-buttons">
              <button onClick={handleAddTask}>Add</button>
              <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
