import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllTutorThunk, fetchLike} from '../store'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import compose from 'recompose/compose';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';


const styles = {
  card: {
    width: 375,
    minHeight: 560,
    margin: 'auto',
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
};

class AllTutors extends Component {

  componentDidMount() {
    this.props.fetchTutors()
  }

  render() {
    const { classes, tutors, user } = this.props;
    return (
      <div>
        <h1>Skill Sharers</h1>
        <div style={{ padding: 20 }}>
           <Grid container spacing={40}>
         {tutors.filter(tutor => tutor.id!==user.id).map(tutor=> {
            return (
               <Card key={tutor.id} className={classes.card} style={{ backgroundImage : `url(${tutor.imageUrl})`, opacity: '50%', marginBottom: '.5%', marginTop: '.5%'}}>
                <CardContent style={{ textAlign : 'center', marginTop: '88%'}}>
                  <Typography variant="headline" component="h1">
                    {`${tutor.fullName}`}
                  </Typography>
                  <Typography component="h2" >
                    {`${tutor.city}, ${tutor.state}`}
                  </Typography>
                  <Typography className={classes.title}>
                    Skills: Javascript<br />
                  </Typography>
                </CardContent>
                <br/>
                <CardActions>
                <Link to={`/tutors/${tutor.id}`} style={{ margin : 'auto'}}>
                  <Button variant="contained" color="primary" className={classes.button}>
                  Learn More
                  </Button>
                </Link>
              <p>{`Match Status: ${this.props.fetchLike(user, tutor)}`}</p>
              {this.props.fetchLike(user, tutor) ==='match'
              ?
              <div className='enter-chat'>
                <Link to="/chatroom/1">
                  <img id='enter-chat'src='/chat.png'/>
                </Link>
              </div>
              :
              this.props.fetchLike(user, tutor) ==='like' 
              ? <p>Waiting for response...</p> 
              :<Button onClick={() => this.props.handleClick(user.id, tutor.id)} variant="contained" color="secondary" className={classes.button}>
                  Exchange!
                </Button>
              }
             </CardActions>
              </Card>
            )})}
           </Grid>
         </div>

      </div>
    )
  }
}

 AllTutors.propTypes = {
   classes: PropTypes.object.isRequired
  }

const mapStateToProps = state => {
  return {
    user: state.user,
    tutors: state.allTutors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTutors: () => dispatch(fetchAllTutorThunk()),
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
export default compose(
    withStyles(styles, {
      name: 'AllTutors',
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(AllTutors);