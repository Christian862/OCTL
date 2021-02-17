/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { connect } from 'react-redux';
import { fetchBoard } from '../../actions';
import BoardNav from './BoardNav';

import '../../Styles/BoardView.css';

class BoardView extends React.Component {
  state = {
    lists: [],
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.fetchBoard(match.params.id);
  }

  handleClick = () => {
    this.setState((prevState) => ({
      lists: prevState.lists.concat(['Enter list title...']),
    }));
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
    return this.state.lists.map((item) => (
      <div className="list-wrapper">
        <div className="list">{item}</div>
      </div>
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
    return <div>{this.renderBoard()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  board: state.boards.byId[ownProps.match.params.id],
});
export default connect(mapStateToProps, { fetchBoard })(BoardView);
