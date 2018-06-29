import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MessageEntry} from './'
import {fetchMessages} from '../store'
import PropTypes from 'prop-types'
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import compose from 'recompose/compose'

const styles = {
  row: {
    display: 'flex',
    justifyContent: 'center',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
};

class ChatRoom extends Component {
  componentDidMount() {
    this.props.fetchMessages(1)
  }

  render() {
    return (
      <div>
        <div className={this.props.classes.row}>
        <Avatar alt="Remy Sharp" src="/FullSizeRender.jpg" className={this.props.classes.avatar} />
        <Avatar
          alt="Adelle Charles"
          src="/FullSizeRender.jpg"
          className={classNames(this.props.classes.avatar, this.props.classes.bigAvatar)}
        />
      </div>
      <div>
        {this.props.messages.map(message => (
          <li key={message.id}>{message.content}</li>
        ))}
        <MessageEntry />
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    chatroomId: state.currentDirectMessageChat.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: negotiationId => dispatch(fetchMessages(negotiationId))
  }
}

ChatRoom.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, {
    name: 'ChatRoom',
  }),
  connect(mapStateToProps, mapDispatchToProps),
)(ChatRoom);
