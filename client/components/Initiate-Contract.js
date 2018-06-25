import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWeb3, fetchContract} from '../store';

class InitiateContract extends Component{
  
  componentDidMount(){
    this.props.initiate();
  }

  render(){
    return (
        <div>
          <h3>Initiate Contract</h3>
          <button name='initiate-contract' onClick={() => this.props.fetch(this.props.web3)}>Click Here to Initiate</button>
        </div>
    )
  }
}

const mapState = state => {
  return {
    web3: state.web3,
  }
}

const mapDispatch = dispatch => {
	return {
		initiate: () => dispatch(fetchWeb3()), 
    fetch: (web3) => dispatch(fetchContract(web3))
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
