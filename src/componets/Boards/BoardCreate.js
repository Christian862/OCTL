/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';

import { createBoard } from '../../actions';

class CreateBoard extends React.Component {
  state = { boardName: '' };

  handleSubmit = () => {
    const { createBoard } = this.props;
    const { boardName } = this.state;

    createBoard(boardName);
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
    const { boardName } = this.state;

    return (
      <div className="ui form">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title of your new board..."
            value={boardName}
            onChange={(e) => this.setState({ boardName: e.target.value })}
          />
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        title="New Board"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

export default connect(null, { createBoard })(CreateBoard);
