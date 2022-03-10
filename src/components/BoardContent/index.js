import Column from "components/Column";
import { initialData } from "actions/initialData";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import "./style.scss";
import { mapOrder } from "utilities/sortArray";
import { Container, Draggable } from "react-smooth-dnd";

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
    console.log("sadfg", dropResult);
    // const scene = Object.assign({}, this.state.scene);
    // scene.children = applyDrag(scene.children, dropResult);
    // this.setState({
    //   scene,
    // });
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
            <Column column={column} />
          </Draggable>
        ))}
      </Container>
    </div>
  );
}

export default BoardContent;
