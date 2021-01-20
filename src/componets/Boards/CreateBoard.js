/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable class-methods-use-this */
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import Modal from '../Modal';

class CreateBoard extends React.Component {
  state = { boardName: '' };

  renderActions() {
    return (
      // React fragment shorthand syntax
      <>
        <button type="button" className="ui button negative">
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
          <label>Board Title</label>
          <input
            value={boardName}
            onChange={(e) => {
              return this.setState({ boardName: e.target.value });
            }}
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
        onDismiss={() => {
          return history.push('/');
        }}
      />
    );
  }
}

export default CreateBoard;
