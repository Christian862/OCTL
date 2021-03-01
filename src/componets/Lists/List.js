/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList, editList } from '../../actions';

import '../../Styles/Lists.css';

const List = ({ listId }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists.byId[listId]);
  const [titleInput, setTitleInput] = useState('');

  useEffect(() => {
    dispatch(fetchList(listId));
  }, [listId]);

  useEffect(() => {
    if (titleInput.localeCompare('') === 0 && list) {
      setTitleInput(list.listTitle);
    }
  }, [list]);

  const handleTitleChange = (e) => {
    setTitleInput(e.target.value);

    dispatch(editList(list.id, { listTitle: e.target.value }));
  };

  const handleNewCard = () => {
    console.log('Dispatch new card action');
  };

  const renderListItems = () => <div>CARD</div>;

  if (!list) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="list-wrapper">
        <div className="list">
          <input
            className="list-title"
            type="text"
            value={titleInput}
            onFocus={(e) => e.target.select()}
            onChange={handleTitleChange}
          />
          {renderListItems()}
          <button
            onClick={handleNewCard}
            type="button"
            className="ui labeled icon button add-card"
          >
            <i className="plus icon" />
            Add another card
          </button>
        </div>
      </div>
    );
  }
};
export default List;
