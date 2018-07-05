import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  heading: {
    fontSize: theme.typography.pxToRem(50),
    fontWeight: theme.typography.fontWeightRegular
  }
});

const About = props => {
  const { classes } = props;

  return (
    <div className="center-nav-content" style={{backgroundImage: `url("https://images.pexels.com/photos/212937/pexels-photo-212937.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")`}}>
      <div id="about-description">
        <Paper className={classes.root} elevation={1}  style={{}}>
          <Typography className={classes.heading} variant="headline" component="h3">
            Trinsic
          </Typography>
          </Paper>
          <Paper className={classes.root} elevation={1}>
          <Typography component="p">
            Trinsic is a peer-to-peer, skill-sharing platform featuring blockchain-based smart contracts.
          </Typography>
          <Typography component="p">
            With Trinsic, people are able to connect together and exchange their expertise with one another.
          </Typography>
          <Typography component="p">
            The four pillars of Trinsic are: accessible education, transparency, credibility, and stewardship.
          </Typography>
          <Typography component="p">
            Our mission is to build a community centered around teaching and learning as we help contribute to 
            opportunities for personal and professional growth.
          </Typography>
        </Paper>

      </div>
    </div>
    );
  };

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
