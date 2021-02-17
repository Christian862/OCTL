// For understanding the state structure
{
  boards: {
    byId: {
      "board1": {
        id: "board1",
        boardTitle: "This is a title",
        lists: ["list1", "list2"]
      },
      "board2": {
        id: "board2",
        boardTitle: "Another title",
        lists: [ "list3"]
      }
    },
    allIds: ["board1", "board2"]
  },
  lists: {
    byId: {
      "list1": {
        id: "list1",
        listTitle: "List Title",
        cards: ["card1", "card2"],
      },
      "list2": {
        id: "list2",
        listTitle: "Another List Title",
        cards: ["card3"],
      },
      "list3": {
        id: "list3",
        listTitle: "An Empty List",
        cards: [],
      },
    },
    allIds: ["list1", "list2", "list3"]
  },
  cards: {
    byId: {
      "card1": {
        id: "card1",
        cardTitle: "...",
      },
      "card2": {
        id: "card2",
        cardTitle: "...",
      },
      "card3": {
        id: "card3",
        cardTitle: "...",
      }
    },
    allIds: ["card1", "card2", "card3"]
  }
}