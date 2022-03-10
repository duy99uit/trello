import Task from "components/Task";
import React from "react";
import "./style.scss";

function Column() {
  return (
    <div className="column">
      <header>Header</header>
      <ul className="task-list">
        <Task />
        <Task />
        <Task />
      </ul>
      <footer>Add new content</footer>
    </div>
  );
}

export default Column;
