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
import {fetchSingleTutor, fetchLike, me, fetchContract, finalizeContractThunk} from '../store'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import Fade from '@material-ui/core/Fade'
import {Message, FileDocument} from 'mdi-material-ui'

const styles = theme => ({
  card: {
    maxWidth: 375,
    margin: 'auto'
  },
  media: {
    // backgroundSize: `contain`,
    paddingTop: '70%' // 16:9
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  }
})

class SingleTutor extends Component {
  constructor() {
    super()
    this.state = {
      status: false,
      open: false,
      clickStatus: false,
    }
  }
  async componentDidMount() {
    const tutorId = this.props.match.params.id
    await this.props.fetchTutor(tutorId)
    await this.props.fetchUser()
    const status = await this.props.fetchLike(this.props.user, this.props.tutor)
    this.setState({status})
  }

  async componentDidUpdate(prevProps) {
    if (this.props.matches.length !== prevProps.matches.length) {
      this.handleToast()
    }
    if (prevProps.tutor.fullName !== this.props.tutor.fullName){
      const status = this.props.fetchLike(this.props.user, this.props.tutor)
      this.setState({status})
    }
    if (prevProps.contract !== this.props.contract){
      this.setState({clickStatus: false})
      console.log(prevProps.tutor.id)
      await this.props.fetchTutor(prevProps.tutor.id)
      await this.props.fetchUser()
    }
  }

  handleToast = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const {classes, tutor, user, fetchContract, contract, fetch} = this.props
    let currentContract = user.contracts
      ? fetchContract(user, tutor)
      : undefined
    let currentContractId = currentContract ? currentContract.id : undefined
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
          <CardActions style={{justifyContent: 'center'}}>
          {this.state.status ==='match'
          ?
          this.state.clickStatus
          ?
          <span>Processing...</span> 
          : 
          this.props.contract.contractInfo || (currentContract && !currentContract.isStatusOpen)
          ?
          <div>
          <Link to={`/contract/${currentContractId}`}>
          <Button>
          <span className="Mstart(10px) Va(m)">View and Finalize Contract</span>
            <FileDocument className={classes.rightIcon} />
          </Button>
          </Link>          
          <br/>
          <Link to={`../../chatroom/${tutor.id}`}>
          <Button>
          <span>Chat with {tutor.firstName}</span>
            <Message className={classes.rightIcon} />
          </Button>
          </Link>
          </div>
          : 
          <div>
           <div>
         <Button
          type='submit' name='initiate-contract' disabled={contract.id} onClick={() => {
            fetch(user, tutor)
            this.setState({clickStatus: true})
          }}
          >
            <span className="Mstart(10px) Va(m)">Initiate Contract</span>
            <FileDocument className={classes.rightIcon} />
          </Button>
        </div>
        <br/>
          <Link to={`../../chatroom/${tutor.id}`}>
          <Button>
          <span>Chat with {tutor.firstName}</span>
            <Message className={classes.rightIcon} />
          </Button>
          </Link>
          </div>
          :
          this.state.status ==='like' 
          ? <p>Waiting for response...</p> 
          :<Button onClick={() => {
            this.props.handleClick(user.id, tutor.id)
            if (tutor.match.filter(match => match.id ===user.id).length>0)  this.setState({status: 'match'})
            else this.setState({status: 'like'})
          }} variant="contained" 
          // color="secondary" 
          className={classes.button}
          style={{backgroundColor: "#181d51", color: "white"}}
          >
              Exchange!
            </Button>
          }
          </CardActions>
        </Card>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Fade}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={
            <span id="message-id">
              {this.state.status === 'match'
                ? `You've Matched!`
                : `Your request has been sent!`}
            </span>
          }
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    tutor: state.tutor,
    chatRooms: state.allDirectMessageChats,
    chatRoom: state.currentDirectMessageChat,
    matches: state.match,
    contract: state.contract
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTutor: tutorId => dispatch(fetchSingleTutor(tutorId)),
    fetchUser: () => dispatch(me()),
    fetchLike: (user, tutor) => {
      if (!user.match || !tutor.match) return false
      else {
        if (user.match.filter(like => like.id === tutor.id).length > 0) {
          //user likes tutor
          if (
            tutor.match.filter(userlike => userlike.id === user.id).length > 0
          )
            return 'match'
          else return 'like'
        } else return false
      }
    },
    handleClick: (userId, tutorId) => dispatch(fetchLike(userId, tutorId)),
    fetchContract: (user, tutor) => {
      const contract = user.contracts.filter(contract => {
        return (
          contract.users[0].id === tutor.id || contract.users[1].id === tutor.id
        )
      })[0]
      return contract
    },
    fetch: (user, tutor) => dispatch(fetchContract(user, tutor)),
    finalize: (address) => dispatch(finalizeContractThunk(address))
  }
}

SingleTutor.propTypes = {
  classes: PropTypes.object.isRequired
}

export default compose(
  withStyles(styles, {
    name: 'SingleTutor'
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(SingleTutor)
