import React from "react";
import "./style.scss";

function Card(props) {
  const { card } = props;
  return (
    <li className="card-item">
      {card.cover && <img src={card.cover} />}

      {card.title}
    </li>
  );
}

export default Card;
