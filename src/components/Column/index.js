import Card from "components/Card";
import React from "react";
import "./style.scss";

function Column() {
  return (
    <div className="column">
      <header>Header</header>
      <ul className="task-list">
        <Card />
        <Card />
        <Card />
      </ul>
      <footer>Add new content</footer>
    </div>
  );
}

export default Column;
