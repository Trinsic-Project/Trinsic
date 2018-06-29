import React from 'react'
import {connect} from 'react-redux'
import {submitMessageThunk, writeMessage} from '../store'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import compose from 'recompose/compose'
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  bootstrapRoot: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 24px)',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
})

function MessageEntry(props) {
  const {message, userId, directMessageId, handleChange, handleSubmit, classes} = props

  return (
    <form
      id="new-message-form"
      onSubmit={evt => handleSubmit(message, userId, directMessageId, evt)}
    >
    <TextField
        placeholder="Say something nice..."
        id="bootstrap-input"
        value={message}
        onChange={handleChange}
        name="content"
        InputProps={{
          disableUnderline: true,
          classes: {
            root: classes.bootstrapRoot,
            input: classes.bootstrapInput,
          },
        }}
        InputLabelProps={{
          shrink: true,
          className: classes.bootstrapFormLabel,
        }}
      />
        <span className="input-group-btn">
          <Button variant="contained" color="primary" size="small" className={classes.button} type="submit">
            Send
            <Icon className={classes.rightIcon}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg></Icon>
          </Button>
        </span>
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
MessageEntry.propTypes = {
  classes: PropTypes.object.isRequired
}


export default compose(
    withStyles(styles, {
      name: 'MessageEntry',
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(MessageEntry);
