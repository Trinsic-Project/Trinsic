import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllTutorThunk} from '../store'
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
    const { classes } = this.props;
    return (
      <div>
        <h1>Skill Sharers</h1>
        <div style={{ padding: 20 }}>
           <Grid container spacing={40}>
         {this.props.tutors.map(tutor=> {
            return (
               <Card key={tutor.id} className={classes.card} style={{ backgroundImage : `url(${tutor.imageUrl})`, opacity: '50%'}}>
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
                <Link to={`/tutors/1`} style={{ margin : 'auto'}}>
                  <Button variant="contained" color="primary" className={classes.button}>
                  Learn More
                  </Button>
                </Link>
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
    tutors: state.allTutors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTutors: () => dispatch(fetchAllTutorThunk())
  }
}
export default compose(
    withStyles(styles, {
      name: 'AllTutors',
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(AllTutors);