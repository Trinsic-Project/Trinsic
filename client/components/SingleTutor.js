import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {fetchSingleTutor, fetchMatch} from '../store'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    maxWidth: 375,
    margin: 'auto',
  },
  media: {
    paddingTop: '70%' // 16:9
  }
}

class SingleTutor extends Component {

  componentDidMount() {
    this.props.fetchTutor(1) //update to get the proper tutor
    this.props.fetchStatus(1)
  }

  render() {
    const {classes, tutor, status} = this.props
    console.log(status)
    return (
      <div className="cards">
        <Card className={`${classes.card} cards`}>
          <CardMedia
            className={classes.media}
            image={tutor.imageUrl}
            title="Tutor"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {tutor.fullName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {tutor.city + ', ' + tutor.state}
          </Typography>
            <Typography component="p">{tutor.biography}</Typography>
          </CardContent>
          <CardActions>
          {status 
          ? 
          (<div className='enter-chat'>
            <Link to="/chatroom/1">
              <img id='enter-chat'src='/chat.png'/>
            </Link>
          </div>)
          : 
           (<Button onClick={() => this.props.handleClick(1, 1)}variant="contained" color="secondary" className={classes.button}>
              Exchange!
            </Button>)
          }
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      user: state.user,
      tutor: state.tutor,
      status: state.status
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchTutor: tutor => dispatch(fetchSingleTutor(tutor)),
      fetchStatus: (userId, tutorId) => dispatch(fetchMatch(userId, tutorId))
      handleClick: (userId, tutorId) => dispatch(fetchMatch(userId, tutorId))
    }
  }

  SingleTutor.propTypes = {
    classes: PropTypes.object.isRequired
  }

  export default compose(
    withStyles(styles, {
      name: 'SingleTutor',
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(SingleTutor);
