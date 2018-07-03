import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, toggleSidebar} from '../store'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SideBar from './SideBar'

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

const Navbar = ({handleClick, isLoggedIn, classes, isSideBarOpen, toggle}) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        {isLoggedIn ? (
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={() => toggle(!isSideBarOpen)}
          >
            <MenuIcon />
          </IconButton>
        ) : null}
        <Typography
          variant="title"
          color="inherit"
          className={classes.flex}
          style={{textAlign: 'left'}}
        >
          TRINSIC
        </Typography>
        <Button color="inherit">
          <Link className="link" to="/team">
            Team
          </Link>
        </Button>
        <Button color="inherit">
          <Link className="link" to="/faqs">
            FAQs
          </Link>
        </Button>
        <Button color="inherit">
          <Link className="link" to="/about">
            About
          </Link>
        </Button>
        {isLoggedIn ? (
          <div>
            <Button color="inherit">
              <Link className="link" to="/home">
                Home
              </Link>
            </Button>
            <Button color="inherit" onClick={handleClick}>
              <a className="link" href="#" onClick={handleClick}>
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
    <SideBar />
  </div>
)

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.user.id,
    isSideBarOpen: state.sideBar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleClick: () => dispatch(logout()),
    toggle: bool => dispatch(toggleSidebar(bool))
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
