import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleTutor} from '../store'

class SingleTutor extends Component {
  componentDidMount() {
    this.props.fetchTutor(1)
  }

  render() {
    return (
      <div>
      <div>
        <h3>{this.props.tutor.fullName}</h3>
        <img
          src={this.props.tutor.imageUrl}
        />
                <div>
          <h4>Location</h4>
          <p>{this.props.tutor.city + ', ' + this.props.tutor.state}</p>
        </div>
        <div>
          <h4>Bio</h4>
          <p>{this.props.tutor.biography}</p>
        </div>
        <div>
          <h4>Skills</h4>
          <p>No skills to display</p>
        </div>
        <div>
          <h4>Swap History</h4>
          <p>No past swaps to display</p>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleTutor)
