/* eslint-disable no-case-declarations */

import { combineReducers } from 'redux';
import {
  CREATE_UNIT,
  FETCH_UNIT,
  EDIT_UNIT,
  CREATE_CARD,
} from '../actions/types';

const unitsById = (state = {}, action) => {
  const { payload } = action;

  switch (action.type) {
    case CREATE_UNIT:
      return { ...state, [payload.unitId]: payload };
    case FETCH_UNIT:
      return { ...state, [payload.unitId]: payload };
    case EDIT_UNIT:
      return { ...state, [payload.unitId]: payload };
    case CREATE_CARD:
      const { unitId } = action;
      return {
        ...state,
        [action.unitId]: {
          ...state[action.unitId],
          cards: state[unitId].cards.concat(payload.cardId),
        },
      };
    default:
      return state;
  }
};

const allUnits = (state = [], action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATE_UNIT:
      return state.concat(payload.unitId);
    case FETCH_UNIT:
      if (state.indexOf(action.payload.unitId) === -1) {
        return state.concat(action.payload.unitId);
      } else {
        return state;
      }
    default:
      return state;
  }
};
export default combineReducers({
  byId: unitsById,
  allIds: allUnits,
});
