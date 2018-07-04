import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login, Signup, UserHome, ChatRoom, SingleTutor, AllTutors, About, ViewContract, FAQ, SkillsSelection } from './components'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/users/:id/edit" component={UserHome} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/chatroom/:id" component={ChatRoom} />
        <Route exact path="/tutors/:id" component={SingleTutor} />
        <Route exact path="/tutors" component={AllTutors} />
        <Route exact path="/contract/:id" component={ViewContract} />
        <Route exact path="/about" component={About} />
        <Route exact path="/faqs" component={FAQ} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/" component={UserHome} />
            <Route exact path="/home" component={UserHome} />
            <Route exact path="/home/skillsSelection" component={SkillsSelection} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
