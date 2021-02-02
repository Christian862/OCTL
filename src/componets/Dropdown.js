/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ options, onSelectedChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // if click originated from dropdown elements, do nothing. (i.e. keeps dropdown open)
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
      <div
        onClick={() => {
          return onSelectedChange(option);
        }}
        key={option.boardId}
        className="item"
      >
        {option.boardTitle}
      </div>
    );
  });

  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <div
          onClick={() => {
            return setOpen(!open);
          }}
          className={`ui dropdown ${open ? 'visible active' : ''}`}
        >
          <div className="ui button">
            <div className="text">Boards</div>
            <div className={`menu ${open ? 'visible transition' : ''}`}>
              {renderedOptions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
