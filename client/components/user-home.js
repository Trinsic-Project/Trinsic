import React, { Component } from 'react'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { putUser, fetchNegotiationsThunk } from '../store'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import CardMedia from '@material-ui/core/CardMedia'

const styles = theme => ({
  card: {
    maxWidth: 375,
    margin: 'auto'
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200,
    margin: theme.spacing.unit
  },
  media: {
    paddingTop: '70%' // 16:9
  }
})

class UserHome extends Component {
  constructor(props) {
    super(props)
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
      redirect: false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount(){
    this.props.fetchAllChatRooms()
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value, triggered: true})
    console.log(this.state.firstName)
  }

  render() {
    const {handleSubmit, error, classes} = this.props
    let {
      firstName,
      lastName,
      email,
      streetAddress,
      city,
      state,
      biography,
      imageUrl
    } = this.state

    return (
      <div className="cards">
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={imageUrl} title="User" />
          <CardContent>
            <form onSubmit={evt => handleSubmit(evt, this.state)} name={name}>
              <div>
                <FormControl className={classes.textField}>
                  <InputLabel
                    className="inputLabel"
                    htmlFor="adornment-firstName"
                  >
                    First Name
                  </InputLabel>
                  <Input
                    value={firstName}
                    name="firstName"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl className={classes.textField}>
                  <InputLabel
                    className="inputLabel"
                    htmlFor="adornment-lastName"
                  >
                    Last Name
                  </InputLabel>
                  <Input
                    value={lastName}
                    name="lastName"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel className="inputLabel" htmlFor="adornment-email">
                    Email
                  </InputLabel>
                  <Input
                    value={email}
                    name="email"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormControl>
                {/* <FormControl> */}
                  {/* <InputLabel className="inputLabel" htmlFor="adornment-biography">
                    Bio
                  </InputLabel> */}
                  {/* <TextField
                    id="multiline-flexible"
                    label="Bio"
                    value={biography}
                    name="biography"
                    type="text"
                    onChange={this.handleChange}
                  /> */}
                {/* </FormControl> */}
              </div>
              <div>
                <CardActions>
                  { this.props.match.path.includes("edit")
                    ? <Button type="submit">Update Your Information</Button>
                    : <Link to={`/users/${this.state.id}/edit`}><Button>Click To Edit</Button></Link>
                  }
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
  return {
    user: state.user,
    displayName: '',
    error: state.user.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (evt, user) => {
      evt.preventDefault()
      console.log(user)
      dispatch(putUser(user, user.id))
    },
    fetchAllChatRooms: () => dispatch(fetchNegotiationsThunk())
  }
}

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, {
    name: 'UserHome'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(UserHome)
