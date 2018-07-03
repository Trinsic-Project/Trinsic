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
import {fetchSingleTutor, fetchLike} from '../store'
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import InitiateContract from './Initiate-Contract';

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
    const tutorId = this.props.match.params.id
    this.props.fetchTutor(tutorId) //update to get the proper tutor
  }

  render() {
    const {classes, tutor, user} = this.props
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
          {user.contracts && user.contracts.length
          ? 
          <Link to={`/contract`}>
            <span className="Mstart(10px) Va(m)">View and Finalize Contract</span>
          </Link> : ''
          }
          <p>{`Match Status: ${this.props.fetchLike(user, tutor)}`}</p>
          {this.props.fetchLike(user, tutor) ==='match'
          ?
          <InitiateContract/>
          :
          this.props.fetchLike(user, tutor) ==='like' 
          ? <p>Waiting for response...</p> 
          :<Button onClick={() => this.props.handleClick(user.id, tutor.id)} variant="contained" color="secondary" className={classes.button}>
              Exchange!
            </Button>
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
      chatRooms: state.allDirectMessageChats,
      chatRoom: state.currentDirectMessageChat
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchTutor: tutorId => dispatch(fetchSingleTutor(tutorId)),
      fetchLike: (user, tutor) => {
        if (!user.match|| !tutor.match) return false
        else {
          if (user.match.filter(like => like.id === tutor.id).length>0) {//user likes tutor
            if (tutor.match.filter(userlike => userlike.id === user.id).length>0) return 'match'
            else return 'like'
          }
          else return false
        }
    },
      handleClick: (userId, tutorId) => dispatch(fetchLike(userId, tutorId))
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
