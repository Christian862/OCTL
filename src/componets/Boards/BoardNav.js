import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editBoard } from '../../actions';

import '../../Styles/BoardNav.css';

// todo: use a proper form package for this input
const BoardNav = ({ board }) => {
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState(board.boardTitle);

  useEffect(() => {
    setTitleInput(board.boardTitle);
  }, [board.boardId]);

  const handleChange = (e) => {
    setTitleInput(e.target.value);

    dispatch(editBoard(board.id, { boardTitle: e.target.value }));
  };
  const renderTitle = () => (
    <input
      type="text"
      value={titleInput}
      size={titleInput.length}
      onFocus={(e) => e.target.select()}
      onChange={handleChange}
    />
  );

  return (
    <div className="ui secondary menu">
      <div className="item">{renderTitle()}</div>
    </div>
  );
};

export default BoardNav;
