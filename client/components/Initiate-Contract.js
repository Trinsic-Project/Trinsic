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
          <button type='submit' name='initiate-contract' onClick={() => this.props.fetch(this.props.web3, this.props.user, this.props.tutor)}>Initiate Contract</button>
        </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    tutor: state.tutor, 
    web3: state.web3,
    contract: state.contract
  }
}

const mapDispatch = dispatch => {
	return {
		initiate: () => dispatch(fetchWeb3()), 
    fetch: (web3, user, tutor) => dispatch(fetchContract(web3, user, tutor)),
    finalize: (address) => dispatch(finalizeContractThunk(address))
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
