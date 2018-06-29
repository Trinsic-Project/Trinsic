import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchWeb3, fetchContract, finalizeContractThunk} from '../store';

class InitiateContract extends Component{
  
  componentDidMount(){
    this.props.initiate();
  }

  render(){
    return (
        <div className='contract-buttons'>
          <button name='initiate-contract' onClick={() => this.props.fetch(this.props.web3)}>Initiate Contract</button>
          <button name='finalize-contract' onClick={() => this.props.finalize(this.props.contract.address)}>Finalize Contract</button>
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
    finalize: (address) => dispatch(finalizeContractThunk(address))
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
