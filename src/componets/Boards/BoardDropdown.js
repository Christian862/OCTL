/* eslint-disable arrow-body-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Dropdown.css';

const BoardDropdown = ({ options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // if click originated fromBoardDropdown elements, do nothing. (i.e. keepsBoardDropdown open)
  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map((option) => {
    return (
      <Link
        to={`/${option.boardId}`}
        onClick={() => setOpen(!open)}
        key={option.boardId}
        className="boardOption"
      >
        {option.boardTitle}
      </Link>
    );
  });

  return (
    <div ref={ref} className="dropdown">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="ui button"
      >
        Boards
      </div>
      <div
        id="boardDropdown"
        className={`dropdown-content ${open ? 'show' : ''}`}
      >
        {renderedOptions}
      </div>
    </div>
  );
};

export default BoardDropdown;
