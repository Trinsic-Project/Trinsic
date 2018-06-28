// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {fetchSingleTutor} from '../store'

// class SingleTutor extends Component {
//   componentDidMount() {
//     this.props.fetchTutor(1)
//   }

//   render() {
//     return (
//       <div>
//       <div>
//         <h3>{this.props.tutor.fullName}</h3>
//         <img
//           src={this.props.tutor.imageUrl}
//         />
//                 <div>
//           <h4>Location</h4>
//           <p>{this.props.tutor.city + ', ' + this.props.tutor.state}</p>
//         </div>
//         <div>
//           <h4>Bio</h4>
//           <p>{this.props.tutor.biography}</p>
//         </div>
//         <div>
//           <h4>Skills</h4>
//           <p>No skills to display</p>
//         </div>
//         <div>
//           <h4>Swap History</h4>
//           <p>No past swaps to display</p>
//         </div>
//       </div>
//     </div>
//     )
//   }
// }

// const mapStateToProps = state => {
//   return {
//     tutor: state.tutor
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     fetchTutor: tutor => dispatch(fetchSingleTutor(tutor))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SingleTutor)


import React, {Component} from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose';
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

const styles = {
  card: {
    maxWidth: 375,
    direction: 'row',
    justify: 'center',
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
            <Typography className={classes.pos} color="textSecondary">
            {this.props.tutor.city + ', ' + this.props.tutor.state}
          </Typography>
            <Typography component="p">{this.props.tutor.biography}</Typography>
          </CardContent>
          <CardActions>
            <InitiateContract/>
            <Button size="small" color="primary">
              Chat with {this.props.tutor.firstName}
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

  // export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles))(SingleTutor)

  export default compose(
    withStyles(styles, {
      name: 'SingleTutor',
    }),
    connect(mapStateToProps, mapDispatchToProps),
  )(SingleTutor);