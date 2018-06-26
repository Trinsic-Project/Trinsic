const SwapAgreement = require('../../build/contracts/SwapAgreement.json')
const contract = require('truffle-contract')
const contractInstance = contract(SwapAgreement) //This creates an instance of our contract


//Action Types
const GET_CONTRACT = 'GET_CONTRACT'
const FINALIZE_CONTRACT = 'FINALIZE_CONTRACT' 

//Action Creators
const getContract = contract => ({type: GET_CONTRACT, payload: contract})
const finalizeContract = contract => ({type: FINALIZE_CONTRACT, payload: contract})


//Thunk Creators
export const fetchContract = web3 => {
  web3.currentProvider && contractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    contractInstance
      .deployed()
      .then(instance => {
        console.log(instance.initiatorSkill.call());
        console.log(instance.initiator.call());
        dispatch(getContract(instance))
      })
  }
}

export const finalizeContractThunk = contract => {
  return dispatch => {
    console.log(contract)
    contract.FinalizeAgreement()
      .then(instance => {
        console.log(instance.respondentSkill.call());
        console.log(instance.respondent.call());
        dispatch(finalizeContract(instance))
      })
  }
}



//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CONTRACT:
      return action.payload
    case FINALIZE_CONTRACT:
      return action.payload
    default:
      return state
  }
}
