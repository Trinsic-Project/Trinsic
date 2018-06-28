import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MessageEntry } from './';
import { fetchMessages } from '../store';

class ChatRoom extends Component {
  componentDidMount () {
    this.props.fetchMessages(1);
  }

  render () {
    return (
      <div>
        {this.props.messages.map(message => (
          <li key={message.id}>{message}</li>
        ))}
        <MessageEntry />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    chatroomId: state.currentDirectMessageChat.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages => negotiationId => dispatch(fetchMessages(negotiationId));
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoom);
