/* eslint-disable class-methods-use-this */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProperties } from '../actions';
import GoogleAuth from './GoogleAuth';
import PropertyDropdown from './Properties/PropertyDropdown';
import '../Styles/MainNav.css';

class MainNav extends React.Component {
  componentDidMount() {
    this.props.fetchProperties();
  }

  renderPropertiesDropdown() {
    if (!this.props.properties) {
      return <div>Loading...</div>;
    }
    return <PropertyDropdown options={this.props.properties} />;
  }

  renderNewPropertyButton() {
    return (
      <div className="item">
        <Link to="/property/new" className="ui button">
          New Property
        </Link>
      </div>
    );
  }

  renderPortfolioButton() {
    return (
      <div className="item">
        <Link to="/" className="ui button">
          Portfolio
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="ui secondary menu">
        <div className="item">{this.renderPortfolioButton()}</div>
        <div className="item">{this.renderPropertiesDropdown()}</div>
        <div className="item">
          <div className="ui icon input">
            <input type="text" placeholder="Search..." />
            <i className="search link icon" />
          </div>
        </div>
        <div className="right menu">
          {this.renderNewPropertyButton()}
          <GoogleAuth />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) =>
  // convert back to array for easy component operation
  ({
    properties: Object.values(state.properties.byId),
  });
export default connect(mapStateToProps, { fetchProperties })(MainNav);
