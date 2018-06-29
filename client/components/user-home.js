import React, {Component} from 'react'
import compose from 'recompose/compose'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'

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
  media: {
    paddingTop: '70%' // 16:9
  },
});

class UserHome extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      biography: '',
      imageUrl: '',
      fullName: '',
      triggered: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value, triggered: true });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    store
      .dispatch(putStudent(this.state, Number(this.props.match.params.studentId)))
      .then(() => {
        this.setState({ redirect: true });
      })
      .then(() => {
          this.firstName = '';
          this.lastName = '';
          this.email = '';
          this.gpa = 0;
          this.campusId = null;
          this.triggered = false;
          this.redirect = false;
      })
  }

  render(){
    const {name, displayName, handleSubmit, error, classes, user} = this.props
  return (
    <div>
      <Card className={classes.card}>
      <CardMedia
            className={classes.media}
            image={user.imageUrl}
            title="User"
          />
      <CardContent>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <FormControl className={classes.textField}>
          <InputLabel className="inputLabel" htmlFor="adornment-email">{user.fullName}</InputLabel> 
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
          <Button type="submit">Update</Button>
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
  )
}
}


const mapStateToProps = state => {
  return {
    user: state.user,
    displayName: '',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
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

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
      withStyles(styles, {
        name: 'UserHome',
      }),
      connect(mapStateToProps, mapDispatchToProps),
    )(UserHome);

