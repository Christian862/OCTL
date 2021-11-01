import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editProperty } from '../../actions';

import '../../Styles/PropertyNav.css';

// todo: use a proper form package for this input
const PropertyNav = ({ property }) => {
  const dispatch = useDispatch();
  const [titleInput, setTitleInput] = useState(property.propertyTitle);

  useEffect(() => {
    setTitleInput(property.propertyTitle);
  }, [property.propertyId]);

  const handleChange = (e) => {
    setTitleInput(e.target.value);

    dispatch(editProperty(property.id, { propertyTitle: e.target.value }));
  };
  const renderTitle = () => (
    <input
      className="property-title"
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

export default PropertyNav;
