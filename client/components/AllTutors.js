import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllTutorThunk, fetchSingleTutor, fetchLike, me} from '../store'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import compose from 'recompose/compose'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import CardMedia from '@material-ui/core/CardMedia'
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';

const styles = {
  card: {
    maxWidth: 375,
    margin: 'auto'
  },
  title: {
    fontSize: 16
  },
  pos: {
    marginBottom: 12
  },
  media: {
    paddingTop: '70%' // 16:9
  },
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
}

class AllTutors extends Component {
  state = {
    activeStep: 0,
    unmatchedTutors: []
  };

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: ((prevState.activeStep + 1) % this.state.unmatchedTutors.length),
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  async componentDidMount() {
    const allTutors = await this.props.fetchTutors()
    const user = await this.props.fetchUser()
    const unmatchedTutors = this.props.tutors.filter(tutor => {
      return this.props.user.match.reduce((bool, match) => {
        if(match.id === tutor.id){
          bool = false
        }
        return bool;
      }, true)
    });
    this.setState({ unmatchedTutors })
    // this.props.fetchTutor(unmatchedTutors[0].id)
  }

  render() {
    const {classes, theme, fetchTutor, tutors, user, } = this.props
    const { activeStep, unmatchedTutors } = this.state;

    // const unmatchedTutors = user.id ? tutors.filter(tutor => {
    //   return user.match.reduce((bool, match) => {
    //     if(match.id === tutor.id){
    //       bool = false
    //     }
    //     return bool;
    //   }, true) 
    // }) : null

    return user.id ? (
      <div>
        <h1>Skills</h1>
        <div style={{padding: 20}}>
          <Grid container spacing={40}>
         <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
          >
          {unmatchedTutors.map(tutor => (
            <Card
              key={tutor.id}
              className={classes.card}
              style={{
                opacity: '50%',
                marginBottom: '.5%',
                marginTop: '.5%'
              }}
            >
            <CardMedia
              className={classes.media}
              image={tutor.imageUrl}
              title="Tutor"
            />
            <CardContent style={{textAlign: 'center'}}>
              <Typography variant="headline" component="h1">
                Javascript
              </Typography>
              <Typography className={classes.title}>
                {`Taught by ${tutor.fullName}`}<br />
              </Typography>
              <Typography component="h2">
                {`${tutor.city}, ${tutor.state}`}
              </Typography>
            </CardContent>
            <br />
            <CardActions>
              <Link to={`/tutors/${tutor.id}`} style={{margin: 'auto'}}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={() => fetchTutor(tutor.id)}
                >
                Learn More
                </Button>
              </Link>
                <Button
                  onClick={() =>
                    this.props.handleClick(user.id, tutor.id)
                  }
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                >
             
                  <CardMedia
                    className={classes.media}
                    image={tutor.imageUrl}
                    title="Tutor"
                  />
                  <CardContent style={{textAlign: 'center'}}>
                    <Typography variant="headline" component="h1">
                      {`${tutor.fullName}`}
                    </Typography>
                    <Typography component="h2">
                      {`${tutor.city}, ${tutor.state}`}
                    </Typography>
                    <Typography className={classes.title}>
                      Skills: Javascript<br />
                    </Typography>
                  </CardContent>
                  <br />
                  <CardActions>
                    <Link to={`/tutors/${tutor.id}`} style={{margin: 'auto'}}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={() => fetchTutor(tutor.id)}
                      >
                        Learn More
                      </Button>
                    </Link>
                    <p>{`Match Status: ${this.props.fetchLike(
                      user,
                      tutor
                    )}`}</p>
                    {this.props.fetchLike(user, tutor) === 'match' ? (
                      <div className="enter-chat">
                        <Link to="/chatroom/1">
                          <img id="enter-chat" src="/chat.png" />
                        </Link>
                      </div>
                    ) : this.props.fetchLike(user, tutor) === 'like' ? (
                      <p>Waiting for response...</p>
                    ) : (
                      <Button
                        onClick={() =>
                          this.props.handleClick(user.id, tutor.id)
                        }
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Exchange!
                      </Button>
                    )}
                  </CardActions>
                  <MobileStepper
                    steps={0}
                    position="static"
                    activeStep={activeStep}
                    className={classes.mobileStepper}
                    nextButton={
                      <Button size="small" onClick={this.handleNext} >
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </Button>
                    }
                    backButton={
                      <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                      </Button>
                    }
                  /> 
                </Card>
          ))}
        </SwipeableViews> 
          </Grid>
        </div>
      </div>
    ) : null
  }
}

AllTutors.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

const mapStateToProps = state => {
  return {
    user: state.user,
    tutors: state.allTutors,
    tutor: state.tutor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTutors: () => dispatch(fetchAllTutorThunk()),
    handleClick: (userId, tutorId) => dispatch(fetchLike(userId, tutorId)),
    fetchTutor: tutorId => dispatch(fetchSingleTutor(tutorId)),
    fetchUser: () => dispatch(me())
  }
}
export default compose(
  withStyles(styles, {
    name: 'AllTutors',
    withTheme: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(AllTutors)
