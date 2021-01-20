/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

class MainNav extends React.Component {
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
        <div className="item">
          <div className="ui button">Boards</div>
        </div>
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

export default MainNav;
