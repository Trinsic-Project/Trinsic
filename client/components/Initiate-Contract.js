import React from 'react'
import {connect} from 'react-redux'
import {fetchWeb3} from '../store';

export const InitiateContract = props => {
  props.web3.eth ? 
  props.web3.eth.getAccounts().then(address => console.log(address)) : console.log("not rendered")

  return (
    <div>
      <h3>Initiate Contract</h3>
      <button name='initiate-contract' onClick={props.initiate}>Click Here to Initiate</button>
    </div>
  )
}

const mapState = state => {
  return {
    web3: state.web3,
  }
}

const mapDispatch = dispatch => {
	return {
		initiate: () => dispatch(fetchWeb3())
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
