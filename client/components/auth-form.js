import React from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  card: {
    maxWidth: 375,
    margin: 'auto',
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
    margin: theme.spacing.unit,
  },
});


/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error, classes} = props

  return (
    <div className="center-nav-content">
      <div className='cards'>
        <Card className={classes.card}>
        <CardContent>
        <form onSubmit={handleSubmit} name={name}>
          <div>
            <FormControl className={classes.textField}>
            <InputLabel className="inputLabel" htmlFor="adornment-email">Email</InputLabel>
            <Input name="email" type="text" />
            </FormControl>
          </div>
          <div>
            <FormControl>
            <InputLabel className="inputLabel" htmlFor="adornment-password">Password</InputLabel>
            <Input name="password" type="password" />
            </FormControl>
          </div>
          <div>
          <CardActions>
            <Button type="submit">{displayName}</Button>
            </CardActions>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <Button>
        <a href="/auth/google">{displayName} with Google</a>
        </Button>
        </CardContent>
        </Card>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = compose(
      withStyles(styles, {
        name: 'AuthForm',
      }),
      connect(mapLogin, mapDispatch),
    )(AuthForm);

export const Signup = compose(
      withStyles(styles, {
        name: 'AuthForm',
      }),
      connect(mapSignup, mapDispatch),
    )(AuthForm);

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
  classes: PropTypes.object.isRequired
}
