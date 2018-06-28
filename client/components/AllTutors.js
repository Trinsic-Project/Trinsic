import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchAllTutorThunk} from '../store'

class AllTutors extends Component {
  componentDidMount() {
    this.props.fetchTutors()
  }

  render() {
    return (
      <div>
      <h1>All Tutors</h1>
        <div>
          {this.props.tutors.map(tutor=> {
            return (
              <div className='tutor-card' key={tutor.id}  style={{ backgroundImage : `url(${tutor.imageUrl})` }}>
                <h3>{`${tutor.fullName}`}</h3>
                <h3>{`${tutor.city}, ${tutor.state}`}</h3>
                <h3>Skills: Javascript</h3>
              </div>
              )})}
        </div>
      </div>
    )
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(AllTutors)
