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
import {fetchSingleTutor, fetchLike, me} from '../store'
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
  constructor(){
    super();
    this.state = {
      status: false
    }
  }
  async componentDidMount() {
    const tutorId = this.props.match.params.id
    await this.props.fetchTutor(tutorId)
    await this.props.fetchUser()
    const status = await this.props.fetchLike(this.props.user, this.props.tutor)
    this.setState({status})
  } 

  // componentDidMount(prevProps, prevState) {
  //   console.log('**********', prevProps, 'componentDidupdate!!')
  //   console.log('Xxxxxxxxxxx', prevState, 'componentDidupdate!!')
  //   let {user, tutor} = prevProps
  //   if ((this.state.status !== prevState.status)&& (user.id && tutor.id)) {
  //     this.setState({
  //       status: this.props.fetchLike(this.props.user, this.props.tutor)
  //     })
  //   }
  // }

  render() {
    const {classes, tutor, user, fetchContract} = this.props
    let currentContract = user.contracts ? fetchContract(user, tutor) : undefined
    let currentContractId = currentContract ? currentContract.id : undefined
    // this.state.status = this.props.fetchLike(this.props.user, this.props.tutor)
    return (
      <div className="single-tutor-card">
        <Card className={`${classes.card} `}>
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
          {this.state.status ==='match'
          ?
          currentContract
          ?
          <div>
          <Link to={`/contract/${currentContractId}`}>
            <span className="Mstart(10px) Va(m)">View and Finalize Contract</span>
          </Link> <br/>
          <span>Chat with {tutor.firstName}</span>
          <Link to='../../chatroom/1'>
            <img src='/chat.png'/>
          </Link>
          </div>
          : 
          <div>
          <InitiateContract/><br/>
            <span>Chat with {tutor.firstName}</span>
            <Link to='../../chatroom/1'>
              <img src='/chat.png'/>
            </Link>
          </div>
          :
          this.state.status ==='like' 
          ? <p>Waiting for response...</p> 
          :<Button onClick={() => {
            this.props.handleClick(user.id, tutor.id)
            if (tutor.match.filter(match => match.id ===user.id).length>0)  this.setState({status: 'match'})
            else this.setState({status: 'like'})
          }} variant="contained" color="secondary" className={classes.button}>
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
      fetchUser: () => dispatch(me()),
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
      handleClick: (userId, tutorId) => dispatch(fetchLike(userId, tutorId)),
      fetchContract: (user, tutor) => {
      const contract =  user.contracts.filter(contract => {
        return contract.users[0].id === tutor.id || contract.users[1].id === tutor.id
      })[0];
      return contract
    }
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
