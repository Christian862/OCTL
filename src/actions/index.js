/* eslint-disable arrow-body-style */
import { v4 } from 'uuid';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_CARD,
  CREATE_PROPERTY,
  FETCH_PROPERTIES,
  FETCH_PROPERTY,
  EDIT_PROPERTY,
  CREATE_UNIT,
  FETCH_UNIT,
  FETCH_UNITS,
  EDIT_UNIT,
} from './types';
import properties from '../apis/properties';
import history from '../history';

export const signIn = (userId) => {
  return {
    type: SIGN_IN,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

// #### properties ####
export const createProperty = (title) => {
  return async (dispatch) => {
    const response = await properties.post('/properties', {
      propertyId: v4(),
      propertyTitle: title,
      units: [],
    });

    dispatch({ type: CREATE_PROPERTY, payload: response.data });
    history.push(`/${response.data.propertyId}`);
  };
};

export const fetchProperties = () => {
  return async (dispatch) => {
    const response = await properties.get('/properties');

    dispatch({ type: FETCH_PROPERTIES, payload: response.data });
  };
};

export const fetchProperty = (id) => {
  return async (dispatch) => {
    const response = await properties.get(`/properties?propertyId=${id}`);
    dispatch({ type: FETCH_PROPERTY, payload: response.data[0] });
  };
};

export const editProperty = (id, values) => {
  return async (dispatch) => {
    const response = await properties.patch(`/properties/${id}`, values);
    dispatch({ type: EDIT_PROPERTY, payload: response.data });
  };
};

// #### UNITS ####

export const createUnit = (title, propertyId) => {
  return async (dispatch, getState) => {
    const response = await properties.post('/units', {
      unitId: v4(),
      unitTitle: title,
      cards: [],
    });

    // get current property and send updated unit to server.
    const property = getState().properties.byId[propertyId];
    await properties.patch(`/properties/${property.id}`, {
      units: property.units.concat(response.data.unitId),
    });

    dispatch({ type: CREATE_UNIT, payload: response.data, propertyId });
  };
};

export const fetchUnits = () => {
  return async (dispatch) => {
    const response = await properties.get('/units');

    dispatch({ type: FETCH_UNITS, payload: response.data });
  };
};

export const fetchUnit = (unitId) => {
  return async (dispatch) => {
    const response = await properties.get(`/units?unitId=${unitId}`);
    dispatch({ type: FETCH_UNIT, payload: response.data[0] });
  };
};

export const editUnit = (id, values) => {
  return async (dispatch) => {
    const response = await properties.patch(`/units/${id}`, values);

    dispatch({ type: EDIT_UNIT, payload: response.data });
  };
};

// #### CARDS ####

export const createCard = (title, unitId) => {
  return async (dispatch, getState) => {
    const response = await properties.post('/cards', {
      cardId: v4(),
      cardTitle: title,
    });

    const unit = getState().units.byId[unitId];
    const unitResponse = await properties.patch(`/units/${unit.id}`, {
      cards: unit.cards.concat(response.data.cardId),
    });

    dispatch({ type: CREATE_CARD, payload: response.data, unitId });
  };
};
