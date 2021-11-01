/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/no-autofocus */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUnit, editUnit, createCard } from '../../actions';

import '../../Styles/Units.css';
import Card from '../Cards/Card';

const Unit = ({ unitId }) => {
  const dispatch = useDispatch();
  const unit = useSelector((state) => state.units.byId[unitId]);
  // const cardIds = useSelector((state) => state.lists.byId[listId]);
  const [unitTitle, setUnitTitle] = useState('');

  useEffect(() => {
    dispatch(fetchUnit(unitId));
  }, [unitId]);

  useEffect(() => {
    if (unitTitle.localeCompare('') === 0 && unit) {
      setUnitTitle(unit.unitTitle);
    }
  }, [unit]);

  const handleUnitTitleChange = (e) => {
    setUnitTitle(e.target.value);

    dispatch(editUnit(unit.id, { unitTitle: e.target.value }));
  };

  const handleNewCard = () => {
    dispatch(createCard('Enter card title...', unitId));
  };

  const renderUnitItems = () => {
    if (!unit) {
      return <div>Loading...</div>;
    } else {
      return unit.cards.map((item) => <Card key={item} cardId={item} />);
    }
  };

  if (!unit) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="unit-wrapper">
        <div className="unit">
          <input
            className="unit-title"
            type="text"
            value={unitTitle}
            onFocus={(e) => e.target.select()}
            onChange={handleUnitTitleChange}
          />
          {renderUnitItems()}
          <button
            onClick={handleNewCard}
            type="button"
            className="ui labeled icon button add-card"
          >
            <i className="plus icon" />
            Add card
          </button>
        </div>
      </div>
    );
  }
};
export default Unit;
