import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { me } from '../store'
import axios from 'axios'
import history from '../history'

class UserInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      state: "",
      biography: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    ev.preventDefault();
    this.setState({[ev.target.name]: ev.target.value})
  }

  async handleSubmit(ev) {
    ev.preventDefault();

    const targetId = this.props.user.id;
    const payload = this.state;
    console.log(targetId, payload)

    const editUser = await axios.put(`/api/users/${targetId}`, payload)
    .then(res => res.data)
    .then(updatedUser => console.log("hey", updatedUser))
    .catch(err => console.log(err))

    const getTheUser = await this.props.getUser()

    history.push("/home")
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>City</label>
            <input name="city" value={this.state.city} onChange={this.handleChange}></input>
          <label>State</label>
            <input name="state" value={this.state.state} onChange={this.handleChange}></input>
          <label>Biography</label>
            <input name="biography" value={this.state.biography} onChange={this.handleChange}></input>
          <button>SUBMIT</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    getUser: () => dispatch(me())
  }
}

const UserInformationContainer = connect(null, mapDispatch)(UserInformation)

export default UserInformationContainer
