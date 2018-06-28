import React from 'react'
import {connect} from 'react-redux'
import {submitMessageThunk, writeMessage} from '../store'

function MessageEntry(props) {
  const {message, userId, directMessageId, handleChange, handleSubmit} = props

  return (
    <form
      id="new-message-form"
      onSubmit={evt => handleSubmit(message, userId, directMessageId, evt)}
    >
      <div className="input-group input-group-lg">
        <input
          className="form-control"
          type="text"
          name="content"
          value={message}
          onChange={handleChange}
          placeholder="Say something nice..."
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit">
            Chat!
          </button>
        </span>
      </div>
    </form>
  )
}

const mapStateToProps = function(state) {
  return {
    message: state.message,
    messages: state.messages,
    userId: state.user.id,
    directMessageId: state.currentDirectMessageChat.id
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    handleChange(evt) {
      dispatch(writeMessage(evt.target.value))
    },
    handleSubmit(content, userId, directMessageId, evt) {
      evt.preventDefault()
      dispatch(submitMessageThunk({content, userId, directMessageId}))
      dispatch(writeMessage(''))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageEntry)
