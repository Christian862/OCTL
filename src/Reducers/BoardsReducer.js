/* eslint-disable no-case-declarations */
import _ from 'lodash';
import { combineReducers } from 'redux';
import { CREATE_BOARD, FETCH_BOARDS } from '../actions/types';

function addBoard(state, action) {
  const { boardId } = action.payload;

  return {
    ...state,
    [boardId]: action.payload,
  };
}

const boardsById = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return addBoard(state, action);
    case FETCH_BOARDS:
      return { ...state, ..._.mapKeys(action.payload, 'boardId') };
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
    default:
      return state;
  }
};

export default combineReducers({
  byId: boardsById,
  allIds: allBoards,
});
