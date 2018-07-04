import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import {connect} from 'react-redux'
import {toggleSidebar, fetchSingleTutor} from '../store'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import {Link} from 'react-router-dom'
import compose from 'recompose/compose'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const styles = theme => ({
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  logo: {
    width: '50%'
  }
})

const SideBar = ({classes, toggle, isSideBarOpen, user, fetchTutor}) => {
  const initiatedContracts = user.contracts
    ? user.contracts.filter(contract => {
        return contract.isStatusOpen
      })
    : []
  const finalizedContracts = user.contracts
    ? user.contracts.filter(contract => {
        return !contract.isStatusOpen
      })
    : []

  const sideList = user.match ? (
    <div className={classes.list}>
      <List component="nav" disablePadding>
        <Button style={{backgroundColor: "#fdcddd"}} onClick={() => toggle(false)}>
          <Link to="/chatroom/home">
            <img style={{width: '50%'}} src="/android-chrome-512x512.png" />
          </Link>
        </Button>
        <Divider />
        <div>
          <ListItem style={{fontWeight: 'bold'}}>My Connections</ListItem>
          {user.match[0] ? (
            user.match.map(tutor => {
              return (
                <Link
                  onClick={() => fetchTutor(tutor.id)}
                  key={tutor.id}
                  className="link"
                  style={{margin: 0}}
                  to={`/tutors/${tutor.id}`}
                >
                  <ListItem button>
                    <ListItemText primary={tutor.fullName} />
                  </ListItem>
                </Link>
              )
            })
          ) : (
            <div> No Current Connections </div>
          )}
        </div>
        <ListItem style={{fontWeight: 'bold'}}>Initiated Swaps</ListItem>
        {user.contracts[0] ? (
          initiatedContracts.map(contract => {
            return (
              <div key={contract.id}>
                <Link
                  className="link"
                  to={`/contracts/${contract.id}`}
                  style={{margin: 0}}
                >
                  <ListItem button>
                    <ListItemText primary={`Swap #${contract.id}`} />
                  </ListItem>
                </Link>
              </div>
            )
          })
        ) : (
          <div> No Current Swaps </div>
        )}
        <ListItem style={{fontWeight: 'bold'}}>Finalized Swaps</ListItem>
        {user.contracts[0] ? (
          finalizedContracts.map(contract => {
            return (
              <div key={contract.id}>
                <Link
                  className="link"
                  to={`/contracts/${contract.id}`}
                  style={{margin: 0}}
                >
                  <ListItem button>
                    <ListItemText primary={`Swap #${contract.id}`} />
                  </ListItem>
                </Link>
              </div>
            )
          })
        ) : (
          <div> No Finalized Swaps </div>
        )}
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
    isSideBarOpen: state.sideBar,
    tutor: state.tutor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle: bool => dispatch(toggleSidebar(bool)),
    fetchTutor: tutorId => dispatch(fetchSingleTutor(tutorId))
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
