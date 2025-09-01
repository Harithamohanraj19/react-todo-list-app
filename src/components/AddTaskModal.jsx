import React, { useState } from "react";
import "../styles/AddTaskModal.css";

export default function AddTaskModal({ onClose, onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim()) {
      onAdd(text);
      setText("");
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Task</h2>
        <input
          className="task-input"
          type="text"
          placeholder="Enter task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="btn-row">
          <button className="btn cancel" onClick={onClose}>Cancel</button>
          <button className="btn add" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  );
}
