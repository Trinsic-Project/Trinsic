import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import { toggleSidebar } from '../store'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import compose from 'recompose/compose'

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}

const SideBar = ({classes, toggle, isSideBarOpen}) => {
    const sideList = (
      <div className={classes.list}>
        <List>
          <Button variant="outlined" color="default" onClick={() => toggle(false)}>
            <Link  style={{color: 'gray'}} to={`/tutors`}>
              Browse Skill Sharers
            </Link>
          </Button>
        </List>
        <Divider />
        <List>
          <Button color="inherit" onClick={() => toggle(false)}>
            <Link className="link" to="/chatroom/1">
              <img id="enter-chat" src="/chat.png" />
            </Link>
          </Button>
        </List>
      </div>
    )

    return (
      <div>
        <Drawer
          open={isSideBarOpen}
          onClose={() => toggle(!isSideBarOpen)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={() => toggle(false)}
            onKeyDown={() => toggle(false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    )
  }

/**
 * CONTAINER
 */
const mapStateToProps = state => {
  return {
    isSideBarOpen: state.sideBar
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: bool => dispatch(toggleSidebar(bool))
  }
}

export default compose(
  withStyles(styles, {
    name: 'SideBar'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(SideBar)

SideBar.propTypes = {
  classes: PropTypes.object.isRequired
}
