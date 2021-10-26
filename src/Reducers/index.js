import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import BoardsReducer from './BoardsReducer';
import ListsReducer from './ListsReducer';
import CardsReducer from './CardsReducer';

export default combineReducers({
  auth: AuthReducer,
  boards: BoardsReducer,
  lists: ListsReducer,
  cards: CardsReducer,
});
