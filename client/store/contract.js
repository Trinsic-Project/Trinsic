const SwapAgreement = require('../../build/contracts/SwapAgreement.json')
const contract = require('truffle-contract')
const contractInstance = contract(SwapAgreement) //This creates an instance of our contract


//Action Types
const GET_CONTRACT = 'GET_CONTRACT'

//Action Creators
const getContract = contract => ({type: GET_CONTRACT, payload: contract})

//Thunk Creators
export const fetchContract = web3 => {
  web3.currentProvider && contractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    contractInstance
      .deployed()
      .then(instance => dispatch(getContract(instance)))
  }
}

//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_CONTRACT:
      return action.payload
    default:
      return state
  }
}
