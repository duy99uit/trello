import Column from "components/Column";
import { initialData } from "actions/initialData";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import "./style.scss";
import { mapOrder } from "utilities/sortArray";
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from "utilities/dragDrop";

function BoardContent() {
  // eslint-disable-next-line no-undef
  const [boardData, setBoardData] = useState({});
  const [columns, setColumns] = useState([]);
  // eslint-disable-next-line no-undef
  useEffect(() => {
    setBoardData(initialData);
    setBoardData(initialData.boards);
    const dataFilter = initialData.boards.find((item) => item.id === "board-1");
    if (dataFilter) {
      setBoardData(dataFilter);
      setColumns(mapOrder(dataFilter.columns, dataFilter.columnOrder, "id"));
    }
  }, []);

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
            <Column column={column} onCardDrop={onCardDrop} />
          </Draggable>
        ))}
      </Container>
      <div className="add-new-column">
        <i className="fa fa-plus icon" aria-hidden="true"></i> Add new column
      </div>
    </div>
  );
}

export default BoardContent;
