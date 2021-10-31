/* eslint-disable arrow-body-style */
import { v4 } from 'uuid';
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_BOARD,
  FETCH_BOARDS,
  FETCH_BOARD,
  EDIT_BOARD,
  CREATE_LIST,
  FETCH_LIST,
  EDIT_LIST,
  CREATE_CARD,
} from './types';
import boards from '../apis/boards';
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

// #### BOARDS ####
export const createBoard = (title) => {
  return async (dispatch) => {
    const response = await boards.post('/boards', {
      boardId: v4(),
      boardTitle: title,
      lists: [],
    });

    dispatch({ type: CREATE_BOARD, payload: response.data });
    history.push(`/${response.data.boardId}`);
  };
};

export const fetchBoards = () => {
  return async (dispatch) => {
    const response = await boards.get('/boards');

    dispatch({ type: FETCH_BOARDS, payload: response.data });
  };
};

export const fetchBoard = (id) => {
  return async (dispatch) => {
    const response = await boards.get(`/boards?boardId=${id}`);
    dispatch({ type: FETCH_BOARD, payload: response.data[0] });
  };
};

export const editBoard = (id, values) => {
  return async (dispatch) => {
    const response = await boards.patch(`/boards/${id}`, values);
    dispatch({ type: EDIT_BOARD, payload: response.data });
  };
};

// #### LISTS ####

export const createList = (title, boardId) => {
  return async (dispatch, getState) => {
    const response = await boards.post('/lists', {
      listId: v4(),
      listTitle: title,
      cards: [],
    });

    // get current board and send updated list to server.
    const board = getState().boards.byId[boardId];
    await boards.patch(`/boards/${board.id}`, {
      lists: board.lists.concat(response.data.listId),
    });

    dispatch({ type: CREATE_LIST, payload: response.data, boardId });
  };
};

export const fetchList = (listId) => {
  return async (dispatch) => {
    const response = await boards.get(`/lists?listId=${listId}`);
    dispatch({ type: FETCH_LIST, payload: response.data[0] });
  };
};

export const editList = (id, values) => {
  return async (dispatch) => {
    const response = await boards.patch(`/lists/${id}`, values);

    dispatch({ type: EDIT_LIST, payload: response.data });
  };
};

// #### CARDS ####

export const createCard = (title, listId) => {
  return async (dispatch, getState) => {
    const response = await boards.post('/cards', {
      cardId: v4(),
      cardTitle: title,
    });

    const list = getState().lists.byId[listId];
    const listResponse = await boards.patch(`/lists/${list.id}`, {
      cards: list.cards.concat(response.data.cardId),
    });

    dispatch({ type: CREATE_CARD, payload: response.data, listId });
  };
};
