import {
  createNewColumn,
  fetchBoardDertails,
  updateBoard,
  updateColumn,
  updateCard,
} from "actions/api";
import { initialData } from "actions/initialData";
import Column from "components/Column";
import { isEmpty, cloneDeep } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container as BTContainer,
  Form,
  Row,
} from "react-bootstrap";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";
import { mapOrder } from "utilities/sortArray";
import "./style.scss";

function BoardContent() {
  const [boardData, setBoardData] = useState({});
  const [columns, setColumns] = useState([]);
  const [openNewColmnForm, setOpenNewColmnForm] = useState(false);
  const [newColumnValue, setNewColumnValue] = useState("");
  const newColumnInputRef = useRef(null);
  const boardId = "6232eecf01fbd9803b2a5833";

  useEffect(() => {
    setBoardData(initialData);
    setBoardData(initialData.boards);

    fetchBoardDertails(boardId).then((board) => {
      if (board) {
        setBoardData(board);
        setColumns(mapOrder(board.columns, board.columnOrder, "_id"));
      }
    });
  }, []);

  useEffect(() => {
    if (newColumnInputRef && newColumnInputRef.current) {
      newColumnInputRef.current.focus();
      newColumnInputRef.current.select();
    }
  }, [openNewColmnForm]);

  const onColumnDrop = (dropResult) => {
    let newCol = cloneDeep(columns);
    newCol = applyDrag(newCol, dropResult);
    let newBoards = { ...boardData };
    newBoards.columnOrder = newCol.map((c) => c._id);
    newBoards.columns = newCol;

    //prevent lag when drag and drop
    setColumns(newCol);
    setBoardData(newBoards);
    // call api
    updateBoard(newBoards._id, { columnOrder: newBoards.columnOrder }).catch(
      (err) => {
        //console.log("err", err);
        setColumns(columns);
        setBoardData(boardData);
      }
    );
  };

  const onCardDrop = (columId, dropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let newCol = cloneDeep(columns);
      let currentCol = newCol.find((c) => c._id === columId);
      currentCol.cards = applyDrag(currentCol.cards, dropResult);
      currentCol.cardOrder = currentCol.cards.map((item) => item._id);
      setColumns(newCol);
      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        // move 1

        updateColumn(currentCol._id, currentCol).catch(() => {
          setColumns(columns);
        });
      } else {
        //move 2
        updateColumn(currentCol._id, currentCol).catch(() => {
          setColumns(columns);
        });
        if (dropResult.addedIndex !== null) {
          let currentCard = cloneDeep(dropResult.payload);
          currentCard.columnId = currentCol._id;
          updateCard(currentCard._id, currentCard);
        }
      }
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
      // id: Math.random().toString(36).substr(2, 5),
      boardId: boardData._id,
      title: newColumnValue.trim(),
      // cardOrder: [],
      // cards: [],
    };
    createNewColumn(newColumnToAdd).then((newColumn) => {
      //clone
      let newColumns = [...columns];
      newColumns.push(newColumn);
      // boards
      let newBoards = { ...boardData };
      newBoards.columnOrder = newColumns.map((c) => c._id);
      newBoards.columns = newColumns;
      setColumns(newColumns);
      setBoardData(newBoards);
      // delete
      setNewColumnValue("");
      toggleOpenNewColumnForm();
    });
  };

  const onUpdateColumn = (newColumnToUpdate) => {
    // console.log("newColumn", newColumnToUpdate);
    const colIdToUpdate = newColumnToUpdate._id;
    let newColumns = [...columns];
    const colIndexToUpdate = newColumns.findIndex(
      (i) => i._id === colIdToUpdate
    );
    // console.log("colIndexToUpdate", colIndexToUpdate);
    if (newColumnToUpdate._destroy) {
      newColumns.splice(colIndexToUpdate, 1);
    } else {
      newColumns.splice(colIndexToUpdate, 1, newColumnToUpdate);
    }
    let newBoards = { ...boardData };
    newBoards.columnOrder = newColumns.map((c) => c._id);
    newBoards.columns = newColumns;
    setColumns(newColumns);
    setBoardData(newBoards);
  };

  if (isEmpty(boardData)) {
    return <div>Not Found Data</div>;
  }
  //console.log("isEmpty(boardData)", boardData);

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

              <span className="cancel-btn" onClick={toggleOpenNewColumnForm}>
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
