import React, {Component} from 'react'
import {connect} from 'react-redux'


class InitiateContract extends Component{
  
  componentDidMount(){
    this.props.initiate();
  }

  render(){
    return (
        <div>
          
        </div>
    )
  }
}

const mapState = state => {
  return {
    
  }
}

const mapDispatch = dispatch => {
	return {
	
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
