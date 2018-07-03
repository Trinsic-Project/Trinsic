import React from 'react'
import {connect} from 'react-redux'
import { fetchContract, finalizeContractThunk} from '../store';

const InitiateContract = (props) => {
    return (
        <div className='contract-buttons'>
          <button type='submit' name='initiate-contract' onClick={() => props.fetch(props.user, props.tutor)}>Initiate Contract</button>
        </div>
    )
}

const mapState = state => {
  return {
    user: state.user,
    tutor: state.tutor, 
    contract: state.contract
  }
}

const mapDispatch = dispatch => {
	return {
    fetch: (user, tutor) => dispatch(fetchContract(user, tutor)),
    finalize: (address) => dispatch(finalizeContractThunk(address))
	}
}

export default connect(mapState, mapDispatch)(InitiateContract)
