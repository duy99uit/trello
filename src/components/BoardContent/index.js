import Column from "components/Column";
import { initialData } from "actions/initialData";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import "./style.scss";
import { mapOrder } from "utilities/sortArray";

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

  if (isEmpty(boardData)) {
    return <div>Not Found Data</div>;
  }

  return (
    <div className="board-columns">
      {columns.map((column, idx) => (
        <Column key={idx} column={column} />
      ))}
    </div>
  );
}

export default BoardContent;
