/* eslint-disable no-case-declarations */
import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  CREATE_BOARD,
  FETCH_BOARDS,
  FETCH_BOARD,
  EDIT_BOARD,
  CREATE_LIST,
} from '../actions/types';

function addBoard(state, action) {
  const { boardId } = action.payload;

  return {
    ...state,
    [boardId]: action.payload,
  };
}

const boardsById = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATE_BOARD:
      return addBoard(state, action);
    case FETCH_BOARDS:
      return { ...state, ..._.mapKeys(payload, 'boardId') };
    case FETCH_BOARD:
      return { ...state, [payload.boardId]: payload };
    case EDIT_BOARD:
      return { ...state, [payload.boardId]: payload };
    case CREATE_LIST:
      const { boardId } = action;
      return {
        ...state,
        [action.boardId]: {
          ...state[action.boardId],
          lists: state[boardId].lists.concat(payload.listId),
        },
      };
    default:
      return state;
  }
};

const allBoards = (state = [], action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return state.concat(action.payload.boardId);
    case FETCH_BOARDS:
      return _.map(action.payload, 'boardId');
    case FETCH_BOARD:
      if (state.indexOf(action.payload.boardId) === -1) {
        return state.concat(action.payload.boardId);
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default combineReducers({
  byId: boardsById,
  allIds: allBoards,
});
