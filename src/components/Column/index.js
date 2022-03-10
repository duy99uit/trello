import Card from "components/Card";
import React from "react";
import "./style.scss";
import { mapOrder } from "utilities/sortArray";
import { Container, Draggable } from "react-smooth-dnd";

function Column(props) {
  const { column } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const onColumnDrop = (dropResult) => {
    console.log("sadfg", dropResult);
    // const scene = Object.assign({}, this.state.scene);
    // scene.children = applyDrag(scene.children, dropResult);
    // this.setState({
    //   scene,
    // });
  };
  return (
    <div className="column">
      <header className="column-drag-handle">{column.title}</header>
      <div className="card-list">
        <Container
          // onDragStart={(e) => console.log("drag started", e)}
          // onDragEnd={(e) => console.log("drag end", e)}
          // onDragEnter={() => {
          //   console.log("drag enter:", column.id);
          // }}
          // onDragLeave={() => {
          //   console.log("drag leave:", column.id);
          // }}
          // onDropReady={(p) => console.log("Drop ready: ", p)}
          {...column.props}
          groupName="col"
          onDrop={onColumnDrop}
          getChildPayload={(index) => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: "cards-drop-preview",
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, idx) => (
            <Draggable key={idx}>
              <Card key={idx} card={card} />
            </Draggable>
          ))}
        </Container>
      </div>
      <footer>Add new content</footer>
    </div>
  );
}

export default Column;
