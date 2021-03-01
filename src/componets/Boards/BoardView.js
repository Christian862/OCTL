/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { fetchBoard, createList } from '../../actions';
import BoardNav from './BoardNav';
import List from '../Lists/List';

import '../../Styles/BoardView.css';

class BoardView extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.fetchBoard(match.params.id);
  }

  handleClick = () => {
    this.props.createList('Enter list title...', this.props.board.boardId);
  };

  renderNewListButton() {
    return (
      <button
        onClick={this.handleClick}
        type="button"
        className="ui labeled icon button"
      >
        <i className="plus icon" />
        Add another list
      </button>
    );
  }

  renderLists() {
    return this.props.board.lists.map((listId) => (
      <List key={listId} listId={listId} />
    ));
  }

  renderBoard() {
    if (!this.props.board) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <BoardNav board={this.props.board} />
        <div id="board-container">
          {this.renderLists()}
          {this.renderNewListButton()}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.board) {
      return <div>Loading...</div>;
    }
    return (
      <div className="board-view">
        <BoardNav board={this.props.board} />
        <div className="board-wrapper">
          {this.renderLists()}
          {this.renderNewListButton()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  board: state.boards.byId[ownProps.match.params.id],
});
export default connect(mapStateToProps, { fetchBoard, createList })(BoardView);
