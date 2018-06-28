import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleTutor} from '../store'

const styles = {
  card: {
    maxWidth: 375
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
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
            <Typography component="p">{this.props.tutor.biography}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
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

  export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles))(SingleTutor)



