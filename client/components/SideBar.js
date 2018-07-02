import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {toggleSidebar} from '../store'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import compose from 'recompose/compose'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = {
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
}

const SideBar = ({classes, toggle, isSideBarOpen, user}) => {
  console.log('LOOOK HERE', user.match)
  const sideList = user.match ? (
    <div className={classes.list}>
      <List>
        <Button
          variant="outlined"
          style={{backgroundColor: 'blue'}}
          onClick={() => toggle(false)}
        >
          <Link style={{color: 'white'}} to={`/tutors`}>
            Browse Skill Sharers
          </Link>
        </Button>
      </List>
      <Divider />
      <List component="nav">
        <Button color="inherit" onClick={() => toggle(false)}>
          <Link className="link" to="/chatroom/1">
            <img id="enter-chat" src="/chat.png" />
          </Link>
        </Button>
        <ListItem>My Connections</ListItem>
        {user.match.map(tutor => {
          return (
            <Link key={tutor.id} className="link" to={`/tutors/${tutor.id}`}>
              <ListItem button>
                <ListItemText primary={tutor.fullName} />
              </ListItem>
            </Link>
          )
        })}
      </List>
    </div>
  ) : null

  return (
    <div>
      <Drawer open={isSideBarOpen} onClose={() => toggle(!isSideBarOpen)}>
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
    user: state.user,
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
