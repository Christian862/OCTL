// TODO: create cards reducer and handle CREATE_CARD AC.
//

import { combineReducers } from 'redux';
import { CREATE_CARD } from '../actions/types';

const cardsById = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_CARD:
      return { ...state, [payload.cardId]: payload };
    default:
      return state;
  }
};

const allCards = (state = [], action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_CARD:
      return state.concat(payload.cardId);
    default:
      return state;
  }
};

export default combineReducers({
  byId: cardsById,
  allIds: allCards,
});
