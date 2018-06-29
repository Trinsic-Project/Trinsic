import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {fetchSingleTutor} from '../store'
import {InitiateContract} from './'
import { Link } from "react-router-dom";

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
  }

  render() {
    const {classes} = this.props
    return (
      <div>
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={this.props.tutor.imageUrl}
            title="Tutor"
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.tutor.fullName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
            {this.props.tutor.city + ', ' + this.props.tutor.state}
          </Typography>
            <Typography component="p">{this.props.tutor.biography}</Typography>
          </CardContent>
          <CardActions>
          <div className='enter-chat'>
            <InitiateContract/>
            <Link to="/chatroom/1">
              <img id='enter-chat'src='/chat.png'/>
            </Link>
          </div>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
      tutor: state.tutor
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      fetchTutor: tutor => dispatch(fetchSingleTutor(tutor))
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
