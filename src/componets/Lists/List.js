/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchList, editList, createCard } from '../../actions';

import '../../Styles/Lists.css';
import Card from '../Cards/Card';

const List = ({ listId }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists.byId[listId]);
  // const cardIds = useSelector((state) => state.lists.byId[listId]);
  const [listTitle, setListTitle] = useState('');

  useEffect(() => {
    dispatch(fetchList(listId));
  }, [listId]);

  useEffect(() => {
    if (listTitle.localeCompare('') === 0 && list) {
      setListTitle(list.listTitle);
    }
  }, [list]);

  const handleListTitleChange = (e) => {
    setListTitle(e.target.value);

    dispatch(editList(list.id, { listTitle: e.target.value }));
  };

  const handleNewCard = () => {
    dispatch(createCard('Enter title for this card...', listId));
  };

  const renderListItems = () => {
    if (!list) {
      return <div>Loading...</div>;
    } else {
      return list.cards.map((item) => <Card key={item} cardId={item} />);
    }
  };

  if (!list) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="list-wrapper">
        <div className="list">
          <input
            className="list-title"
            type="text"
            value={listTitle}
            onFocus={(e) => e.target.select()}
            onChange={handleListTitleChange}
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
