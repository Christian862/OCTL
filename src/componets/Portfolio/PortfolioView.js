import React from 'react';
import { connect } from 'react-redux';
import '../../Styles/PortfolioView.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { fetchUnits } from '../../actions';

class PortfolioView extends React.Component {
  state = { selectedProperty: null };

  componentDidMount() {
    this.props.fetchUnits();
  }

  setSelectedProperty = (prop) => {
    this.setState({ selectedProperty: prop });
  };

  displayUnits = (propertyUnitIds) => {
    const units = this.props.allUnits.filter(
      (unit) => propertyUnitIds.indexOf(unit.unitId) !== -1
    );
    return units.map((unit, index) => (
      <p key={unit.unitId}>
        {index + 1}. {unit.unitTitle}
      </p>
    ));
  };

  showPropertyDetails = () => {
    const property = this.state.selectedProperty;
    if (property === null) {
      return null;
    }
    return (
      <div className="selected-property-container">
        <div className="selected-property">
          <Typography variant="h5" gutterBottom component="div">
            {property.propertyTitle}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
            asperiores doloribus eligendi illo laborum nostrum officiis
            perferendis, sapiente totam unde!
          </Typography>
          <Typography variant="subtitle2" gutterBottom component="div">
            {this.displayUnits(property.units)}
          </Typography>
        </div>
      </div>
    );
  };

  renderProperties() {
    return this.props.properties.map((prop) => (
      <Card key={prop.propertyId} className="prop-card" sx={{ minWidth: 270 }}>
        <CardActionArea onClick={() => this.setSelectedProperty(prop)}>
          <CardContent className="truncate-box">
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {prop.propertyTitle}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              adjective
            </Typography>
            <Typography className="truncate" variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
              beatae eos incidunt laboriosam nemo quod ratione sequi similique
              sunt ullam? Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Animi at consequatur dolores, harum ipsa labore natus non
              odio perferendis sint?
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ));
  }

  render() {
    return (
      <div className="portfolio-view-container">
        <div className="portfolio-grid">{this.renderProperties()}</div>
        {this.state.selectedProperty ? this.showPropertyDetails() : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  properties: Object.values(state.properties.byId),
  allUnits: Object.values(state.units.byId),
});
export default connect(mapStateToProps, { fetchUnits })(PortfolioView);
