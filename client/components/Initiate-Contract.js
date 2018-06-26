import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWeb3, fetchContract, finalizeContractThunk} from '../store';

class InitiateContract extends Component{
  
  componentDidMount(){
    this.props.initiate();
  }

  render(){
    return (
        <div>
          <h3>Initiate Contract</h3>
          <button name='initiate-contract' onClick={() => this.props.fetch(window.web3)}>Click Here to Initiate</button>
          <button name='finalize-contract' onClick={() => this.props.finalize(this.props.contract)}>Click Here to Finalize</button>
        </div>
    )
  }
}

const mapState = state => {
  return {
    web3: state.web3,
    contract: state.contract
  }
}

const mapDispatch = dispatch => {
	return {
		initiate: () => dispatch(fetchWeb3()), 
    fetch: (web3) => dispatch(fetchContract(web3)),
    finalize: (contract) => dispatch(finalizeContractThunk(contract))
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
