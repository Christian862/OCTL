/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions';

// TODO add fetchBoard AC

class BoardView extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  renderBoard() {
    if (!this.props.boards) {
      return <div>Loading...</div>;
    }
    const selected = this.props.boards.byId[this.props.match.params.id];

    if (!selected) {
      return <div>Board not found</div>;
    }
    return <div>{selected.boardTitle}</div>;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    boards: state.boards,
  };
};
export default connect(mapStateToProps, { fetchBoards })(BoardView);
