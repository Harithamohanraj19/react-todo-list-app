import React from "react";
import "../styles/FilterDropdown.css";

export default function FilterDropdown({ filter, setFilter }) {
  return (
    <div className="dropdown">
      <button className="filter-btn">{filter} ▾</button>
      <ul className="dropdown-menu">
        <li onClick={() => setFilter("All")}>All</li>
        <li onClick={() => setFilter("active")}>Incomplete</li>
        <li onClick={() => setFilter("completed")}>Complete</li>
      </ul>
    </div>
  );
}
