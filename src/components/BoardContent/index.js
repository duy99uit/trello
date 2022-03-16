import Column from "components/Column";
import { initialData } from "actions/initialData";
import { useEffect, useState, useRef, useCallback } from "react";
import { isEmpty } from "lodash";
import "./style.scss";
import { mapOrder } from "utilities/sortArray";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import {
  Container as BTContainer,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";

function BoardContent() {
  const [boardData, setBoardData] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColmnForm, setOpenNewColmnForm] = useState(false);
  const [newColumnValue, setNewColumnValue] = useState("");
  const newColumnInputRef = useRef(null);

  useEffect(() => {
    setBoardData(initialData);
    setBoardData(initialData.boards);
    const dataFilter = initialData.boards.find((item) => item.id === "board-1");
    if (dataFilter) {
      setBoardData(dataFilter);
      setColumns(mapOrder(dataFilter.columns, dataFilter.columnOrder, "id"));
    }
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColmnForm]);

  const onColumnDrop = (dropResult) => {
    let newCol = [...columns];
    newCol = applyDrag(newCol, dropResult);
    let newBoards = { ...boardData };
    newBoards.columnOrder = newCol.map((c) => c.id);
    newBoards.columns = newCol;

    setColumns(newCol);
    setBoardData(newBoards);
  };

  const onCardDrop = (columId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newCol = [...columns];
      let currentCol = newCol.find((c) => c.id === columId);
      currentCol.cards = applyDrag(currentCol.cards, dropResult);
      currentCol.cardOrder = currentCol.cards.map((item) => item.id);
      setColumns(newCol);
    }
  };

  const toggleOpenNewColumnForm = () => {
    setOpenNewColmnForm(!openNewColmnForm);
  };
  const onNewColumnContentChange = useCallback(
    (e) => setNewColumnValue(e.target.value),
    []
  );

  const addNewColmn = () => {
    //prevent empty string
    if (!newColumnValue) {
      newColumnInputRef.current.focus();
      return;
    }
    const newColumnToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: boardData.id,
      title: newColumnValue.trim(),
      cardOrder: [],
      cards: [],
    };
    //clone
    let newColumns = [...columns];
    newColumns.push(newColumnToAdd);
    // boards
    let newBoards = { ...boardData };
    newBoards.columnOrder = newColumns.map((c) => c.id);
    newBoards.columns = newColumns;
    setColumns(newColumns);
    setBoardData(newBoards);
    // delete
    setNewColumnValue("");
    toggleOpenNewColumnForm();
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    // console.log("newColumn", newColumnToUpdate);
    const colIdToUpdate = newColumnToUpdate.id;
    let newColumns = [...columns];
    const colIndexToUpdate = newColumns.findIndex(
      (i) => i.id === colIdToUpdate
    );
    // console.log("colIndexToUpdate", colIndexToUpdate);
    if (newColumnToUpdate._destroy) {
      newColumns.splice(colIndexToUpdate, 1);
    } else {
      newColumns.splice(colIndexToUpdate, 1, newColumnToUpdate);
    }
    let newBoards = { ...boardData };
    newBoards.columnOrder = newColumns.map((c) => c.id);
    newBoards.columns = newColumns;
    setColumns(newColumns);
    setBoardData(newBoards);
  };

  if (isEmpty(boardData)) {
    return <div>Not Found Data</div>;
  }

  return (
    <div className="board-columns">
      <Container
        orientation="horizontal"
        onDrop={onColumnDrop}
        dragHandleSelector=".column-drag-handle"
        getChildPayload={(index) => columns[index]}
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: "columns-drop-preview",
        }}
      >
        {columns.map((column, idx) => (
          <Draggable key={idx}>
            <Column
              column={column}
              onCardDrop={onCardDrop}
              onUpdateColumn={onUpdateColumn}
            />
          </Draggable>
        ))}
      </Container>
      <BTContainer className="btcontainer-cus">
        {!openNewColmnForm && (
          <Row>
            <Col className="add-new-column" onClick={toggleOpenNewColumnForm}>
              <i className="fa fa-plus icon" aria-hidden="true"></i> Add new
              column
            </Col>
          </Row>
        )}
        {openNewColmnForm && (
          <Row>
            <Col className="enter-new-column">
              <Form.Control
                className="input-enter-new-col"
                size="sm"
                type="text"
                placeholder="Enter column title ..."
                ref={newColumnInputRef}
                value={newColumnValue}
                onChange={onNewColumnContentChange}
                onKeyDown={(event) => event.key === "Enter" && addNewColmn()}
              />
              <Button variant="success" size="sm" onClick={addNewColmn}>
                Add Column
              </Button>

              <span
                className="cancel-new-col"
                onClick={toggleOpenNewColumnForm}
              >
                <i className="fa fa-trash icon" />
              </span>
            </Col>
          </Row>
        )}
      </BTContainer>
    </div>
  );
}

export default BoardContent;
