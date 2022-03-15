export const initialData = {
  boards: [
    {
      id: "board-1",
      columnOrder: ["column-1", "column-2", "column-3"],
      columns: [
        {
          id: "column-1",
          boardId: "board-1",
          title: "To do column 1",
          cardOrder: ["card-1", "card-4", "card-3", "card-2"],
          cards: [
            {
              id: "card-1",
              columnId: "column-1",
              title: "Title card 1",
              cover:
                "https://images.unsplash.com/photo-1646900069517-955d7253efa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
            },
            {
              id: "card-2",
              columnId: "column-1",
              title: "Title card 2",
              cover: null,
            },
            {
              id: "card-3",
              columnId: "column-1",
              title: "Title card 3",
              cover: null,
            },
            {
              id: "card-4",
              columnId: "column-1",
              title: "Title card 4",
              cover: null,
            },
          ],
        },
        {
          id: "column-2",
          boardId: "board-1",
          title: "To do column 2",
          cardOrder: ["card-5", "card-6", "card-7"],
          cards: [
            {
              id: "card-5",
              columnId: "column-2",
              title: "Title card 5",
              cover:
                "https://images.unsplash.com/photo-1646617747575-89f8eb728264?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            },
            {
              id: "card-6",
              columnId: "column-2",
              title: "Title card 6",
              cover: null,
            },
            {
              id: "card-7",
              columnId: "column-2",
              title: "Title card 7",
              cover: null,
            },
          ],
        },
        {
          id: "column-3",
          boardId: "board-1",
          title: "To do column 3",
          cardOrder: ["card-8", "card-9", "card-10", "card-11"],
          cards: [
            {
              id: "card-8",
              columnId: "column-3",
              title: "Title card 8",
              cover:
                "https://images.unsplash.com/photo-1640622307877-1e40352b9a48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            },
            {
              id: "card-9",
              columnId: "column-3",
              title: "Title card 9",
              cover: null,
            },
            {
              id: "card-10",
              columnId: "column-3",
              title: "Title card 10",
              cover: null,
            },
            {
              id: "card-11",
              columnId: "column-3",
              title: "Title card 11",
              cover: null,
            },
          ],
        },
      ],
    },
  ],
};
