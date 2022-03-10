import Card from "components/Card";
import React from "react";
import "./style.scss";

function Column(props) {
  const {column} = props
  return (
    <div className="column">
      <header>{column.title}</header>
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
