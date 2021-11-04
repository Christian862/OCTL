import React from 'react';
import { connect } from 'react-redux';
import '../../Styles/PortfolioView.css';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class PortfolioView extends React.Component {
  renderProperties() {
    return this.props.properties.map((prop) => (
      <div key={prop.propertyId} className="property">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
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
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci
              beatae eos incidunt laboriosam nemo quod ratione sequi similique
              sunt ullam?
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      </div>
    ));
  }

  render() {
    console.log('Properties! ', this.props.properties);
    return (
      <div className="portfolio-view-container">{this.renderProperties()}</div>
    );
  }
}

const mapStateToProps = (state) => ({
  properties: Object.values(state.properties.byId),
});
export default connect(mapStateToProps, null)(PortfolioView);
