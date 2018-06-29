import React from 'react'
import PropTypes from 'prop-types'
<<<<<<< Updated upstream
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
=======
import {putUser} from '../store'
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
  constructor(props) {
    super(props);
    let user = this.props.user
    this.state = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      streetAddress: user.streetAddress,
      city: user.city,
      state: user.state,
      biography: user.biography,
      imageUrl: user.imageUrl,
      triggered: false,
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value, triggered: true });
  }

  render(){
    const {handleSubmit, error, classes} = this.props
    let {firstName, LastName, email, streetAddress, city, state, biography, imageUrl} = this.state
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
      </CardContent>
      </Card>
    </div>
  )
}
}

//access store's state with this.props.state, access local state with just this.state
const mapStateToProps = state => {
>>>>>>> Stashed changes
  return {
    email: state.user.email
  }
}

<<<<<<< Updated upstream
export default connect(mapState)(UserHome)
=======
const mapDispatchToProps = dispatch => {
  return {
  handleSubmit(evt) {
    evt.preventDefault();
    dispatch(putUser(this.state, this.state.id))
  }}
}
>>>>>>> Stashed changes

/**
 * PROP TYPES
 */
UserHome.propTypes = {
<<<<<<< Updated upstream
  email: PropTypes.string
=======
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
>>>>>>> Stashed changes
}
