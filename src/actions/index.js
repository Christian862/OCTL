import { v4 } from 'uuid';
import { SIGN_IN, SIGN_OUT, CREATE_BOARD, FETCH_BOARDS } from './types';
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

export const createBoard = (title) => {
  return async (dispatch) => {
    const response = await boards.post('/boards', {
      boardId: v4(),
      boardTitle: title,
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
