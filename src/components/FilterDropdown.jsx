import React from "react";
import "../styles/FilterDropdown.css";

export default function FilterDropdown({ filter, setFilter }) {
  return (
    <div className="dropdown">
      <button className="filter-btn">{filter} ▾</button>
      <ul className="dropdown-menu">
        <li onClick={() => setFilter("ALL")}>ALL</li>
        <li onClick={() => setFilter("INCOMPLETE")}>INCOMPLETE</li>
        <li onClick={() => setFilter("COMPLETE")}>COMPLETE</li>
      </ul>
    </div>
  );
}
