import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {InitiateContract, MessageEntry} from './'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const styles = {
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
}

const Navbar = ({handleClick, isLoggedIn, classes}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          TRINSIC
        </Typography>
        {isLoggedIn ? (
          <div>
            <Button color="inherit">
              <Link className="link" to="/home">
                Home
              </Link>
            </Button>
            <Button color="inherit" onClick={handleClick}>
              <a  className="link" href="#" onClick={handleClick}>
                Logout
              </a>
            </Button>
          </div>
        ) : (
          <div>
            <Button color="inherit">
              <Link className="link" to="/login">
                Login
              </Link>
            </Button>
            <Button color="inherit">
              <Link className="link" to="/signup">
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  </div>
)

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default compose(
  withStyles(styles, {
    name: 'Navbar'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired
}
