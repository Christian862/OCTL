/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBoards } from '../actions';
import GoogleAuth from './GoogleAuth';
import Dropdown from './Dropdown';

class MainNav extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  onSelectedChange(selectedBoard) {
    console.log(selectedBoard);
  }

  renderBoardsDropdown() {
    if (!this.props.boards) {
      return <div>Loading</div>;
    }
    return (
      <Dropdown
        options={this.props.boards}
        onSelectedChange={this.onSelectedChange}
      />
    );
  }

  renderNewBoard() {
    return (
      <div className="item">
        <Link to="/board/new" className="ui button">
          New Board
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="ui secondary menu">
        <div className="item">{this.renderBoardsDropdown()}</div>
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon" />
          </div>
        </div>
        <div className="right menu">
          {this.renderNewBoard()}
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // convert back to array for easy component operation
  return {
    boards: Object.values(state.boards.byId),
  };
};
export default connect(mapStateToProps, { fetchBoards })(MainNav);
