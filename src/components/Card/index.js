import React from "react";
import "./style.scss";

function Card(props) {
  const { card } = props;
  return (
    <div className="card-item">
      {card.cover && <img src={card.cover} onMouseDown={(e)=>e.preventDefault()} />}

      {card.title}
    </div>
  );
}

export default Card;
