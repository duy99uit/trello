import Card from "components/Card";
import ConfirmModal from "components/Common/ConfirmModel";
import { MODAL_ACTION_CONFIRM } from "contants";
import React, { useState, useCallback, useEffect } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { mapOrder } from "utilities/sortArray";
import "./style.scss";
import {
  selectAllInlineText,
  saveContentAfterEnterPressed,
} from "utilities/contentEditor";

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      const newColumn = {
        ...column,
        _destroy: true,
      };
      onUpdateColumn(newColumn);
    }
    toggleShowModal();
  };
  const toggleShowModal = () => {
    setShowModalConfirm(!showModalConfirm);
  };

  const onHandleColumnContentChange = useCallback(
    (e) => setColumnTitle(e.target.value),
    []
  );
  const onHandleColumnContentBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle,
    };
    onUpdateColumn(newColumn);
  };

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            className="trello-content-edit-table"
            size="sm"
            type="text"
            placeholder="Enter column title ..."
            value={columnTitle}
            spellCheck={false}
            onClick={selectAllInlineText}
            onChange={onHandleColumnContentChange}
            onBlur={onHandleColumnContentBlur}
            onKeyDown={saveContentAfterEnterPressed}
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              size="sm"
              className="dropdown-btn"
            />

            <Dropdown.Menu>
              <Dropdown.Item>Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowModal}>
                Remove column
              </Dropdown.Item>
              <Dropdown.Item>Remove all card</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
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
          onDrop={(dropResult) => onCardDrop(column.id, dropResult)}
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
      <footer>
        <div className="footer-actions">
          <i className="fa fa-plus icon" aria-hidden="true"></i>Add new card
        </div>
      </footer>
      <ConfirmModal
        show={showModalConfirm}
        title="Remove Column"
        content={`Are you wanna remove <strong> ${column.title} </strong> !`}
        onAction={onConfirmModalAction}
      />
    </div>
  );
}

export default Column;
