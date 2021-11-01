/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { fetchProperty, createUnit } from '../../actions';
import PropertyNav from './PropertyNav';
import Unit from '../Units/Unit';

import '../../Styles/PropertyView.css';

class PropertyView extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.fetchProperty(match.params.id);
  }

  handleClick = () => {
    this.props.createUnit(
      'Enter unit title...',
      this.props.property.propertyId
    );
  };

  renderNewUnitButton() {
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="ui labeled icon button"
      >
        <i className="plus icon" />
        Add unit
      </button>
    );
  }

  renderUnits() {
    return this.props.property.units.map((unitId) => (
      <Unit key={unitId} unitId={unitId} />
    ));
  }

  renderProperty() {
    if (!this.props.property) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <PropertyNav property={this.props.property} />
        <div id="property-container">
          {this.renderUnits()}
          {this.renderNewUnitButton()}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.property) {
      return <div>Loading...</div>;
    }
    return (
      <div className="property-view">
        <PropertyNav property={this.props.property} />
        <div className="property-wrapper">
          {this.renderUnits()}
          {this.renderNewUnitButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  property: state.properties.byId[ownProps.match.params.id],
});
export default connect(mapStateToProps, { fetchProperty, createUnit })(
  PropertyView
);
