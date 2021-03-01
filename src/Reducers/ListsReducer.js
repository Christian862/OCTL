import { combineReducers } from 'redux';
import { CREATE_LIST, FETCH_LIST, EDIT_LIST } from '../actions/types';

const listsById = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_LIST:
      return { ...state, [payload.listId]: payload };
    case FETCH_LIST:
      return { ...state, [payload.listId]: payload };
    case EDIT_LIST:
      return { ...state, [payload.listId]: payload };
    default:
      return state;
  }
};

const allLists = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_LIST:
      return state.concat(payload.listId);
    case FETCH_LIST:
      if (state.indexOf(action.payload.listId) === -1) {
        return state.concat(action.payload.listId);
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default combineReducers({
  byId: listsById,
  allIds: allLists,
});
