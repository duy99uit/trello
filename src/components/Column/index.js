import Card from "components/Card";
import ConfirmModal from "components/Common/ConfirmModel";
import { MODAL_ACTION_CONFIRM } from "contants";
import React, { useState, useCallback, useEffect, useRef } from "react";
import { Dropdown, Form, Button } from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { mapOrder } from "utilities/sortArray";
import "./style.scss";
import {
  selectAllInlineText,
  saveContentAfterEnterPressed,
} from "utilities/contentEditor";
import { cloneDeep } from "lodash";

function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, "id");
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [columnTitle, setColumnTitle] = useState("");
  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const [newCardValue, setNewCardValue] = useState("");
  const onNewCardContentChange = useCallback(
    (e) => setNewCardValue(e.target.value),
    []
  );
  const newCardInputRef = useRef(null);

  const toggleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm);
  };

  useEffect(() => {
    setColumnTitle(column.title);
  }, [column.title]);

  useEffect(() => {
    if (newCardInputRef && newCardInputRef.current) {
      newCardInputRef.current.focus();
      newCardInputRef.current.select();
    }
  }, [openNewCardForm]);

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

  const addNewCard = () => {
    //prevent empty string
    if (!newCardValue) {
      newCardInputRef.current.focus();
      return;
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      columnId: column.id,
      title: newCardValue.trim(),
      cover: null,
    };

    let newColumn = cloneDeep(column);

    newColumn.cards.push(newCardToAdd);
    newColumn.cardOrder.push(newCardToAdd.id);

    onUpdateColumn(newColumn);

    setNewCardValue("");
    toggleOpenNewCardForm();
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
        {openNewCardForm && (
          <div className="add-new-card-area">
            <Form.Control
              className="textarea-enter-new-card"
              size="sm"
              as="textarea"
              rows={3}
              type="text"
              placeholder="Enter card title ..."
              ref={newCardInputRef}
              value={newCardValue}
              onChange={onNewCardContentChange}
              onKeyDown={(event) => event.key === "Enter" && addNewCard()}
            />
          </div>
        )}
      </div>
      <footer>
        {openNewCardForm && (
          <div className="add-new-card-actions">
            <Button variant="success" size="sm">
              Add Card
            </Button>

            <span className="cancel-btn" onClick={toggleOpenNewCardForm}>
              <i className="fa fa-trash icon" />
            </span>
          </div>
        )}
        {!openNewCardForm && (
          <div className="footer-actions" onClick={toggleOpenNewCardForm}>
            <i className="fa fa-plus icon" aria-hidden="true"></i>Add new card
          </div>
        )}
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
