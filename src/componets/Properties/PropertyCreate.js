/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';

import { createProperty } from '../../actions';

class PropertyCreate extends React.Component {
  state = { propertyName: '' };

  handleSubmit = () => {
    const { createProperty } = this.props;
    const { propertyName } = this.state;

    createProperty(propertyName);
  };

  renderActions() {
    return (
      // React fragment shorthand syntax
      <>
        <button
          onClick={this.handleSubmit}
          type="button"
          className="ui teal button"
        >
          Create
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </>
    );
  }

  renderContent() {
    const { propertyName } = this.state;

    return (
      <div className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title of your new property..."
            value={propertyName}
            onChange={(e) => this.setState({ propertyName: e.target.value })}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        title="New Property"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

export default connect(null, { createProperty })(PropertyCreate);
