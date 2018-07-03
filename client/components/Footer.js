import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

const styles = {
  root: {
    flexGrow: 1
  },
};

class Footer extends React.Component {
  state = {
    value: 'recents',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return ( null
    //   <BottomNavigation value={value} onChange={this.handleChange} showLabels className={classes.root}>
    //     <BottomNavigationAction label="TEAM"  />
    //     <BottomNavigationAction label="FAQS"  />
    //       {/* <Link className="link" to="/about"/> */}
    //     <BottomNavigationAction label="ABOUT" />
    
          
    //   </BottomNavigation>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);

