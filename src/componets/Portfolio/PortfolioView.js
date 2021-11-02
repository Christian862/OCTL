import React from 'react';
import { connect } from 'react-redux';

class PortfolioView extends React.Component {
  render() {
    console.log('Properties! ', this.props.properties);
    return <div className="portfolio-view">Portfolio View!</div>;
  }
}

const mapStateToProps = (state) => ({
  properties: Object.values(state.properties.byId),
});
export default connect(mapStateToProps, null)(PortfolioView);
