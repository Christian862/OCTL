/* eslint-disable no-case-declarations */
import _ from 'lodash';
import { combineReducers } from 'redux';
import {
  CREATE_PROPERTY,
  FETCH_PROPERTIES,
  FETCH_PROPERTY,
  EDIT_PROPERTY,
  CREATE_UNIT,
} from '../actions/types';

function addProperty(state, action) {
  const { propertyId } = action.payload;

  return {
    ...state,
    [propertyId]: action.payload,
  };
}

const propertiesById = (state = {}, action) => {
  const { payload } = action;
  switch (action.type) {
    case CREATE_PROPERTY:
      return addProperty(state, action);
    case FETCH_PROPERTIES:
      return { ...state, ..._.mapKeys(payload, 'propertyId') };
    case FETCH_PROPERTY:
      return { ...state, [payload.propertyId]: payload };
    case EDIT_PROPERTY:
      return { ...state, [payload.propertyId]: payload };
    case CREATE_UNIT:
      const { propertyId } = action;
      return {
        ...state,
        [action.propertyId]: {
          ...state[action.propertyId],
          units: state[propertyId].units.concat(payload.unitId),
        },
      };
    default:
      return state;
  }
};

const allProperties = (state = [], action) => {
  switch (action.type) {
    case CREATE_PROPERTY:
      return state.concat(action.payload.propertyId);
    case FETCH_PROPERTIES:
      return _.map(action.payload, 'propertyId');
    case FETCH_PROPERTY:
      if (state.indexOf(action.payload.propertyId) === -1) {
        return state.concat(action.payload.propertyId);
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default combineReducers({
  byId: propertiesById,
  allIds: allProperties,
});
