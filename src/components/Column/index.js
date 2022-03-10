import Card from "components/Card";
import React from "react";
import "./style.scss";

function Column(props) {
  const { column } = props;
  const cards = column.cards;
  return (
    <div className="column">
      <header>{column.title}</header>
      <ul className="task-list">
        {cards.map((card, idx) => (
          <Card key={idx} card={card} />
        ))}
      </ul>
      <footer>Add new content</footer>
    </div>
  );
}

export default Column;
