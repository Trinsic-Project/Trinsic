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
        dispatch(getContract(instance))
      })
  }
}

export const finalizeContractThunk =  contract => {
  return dispatch => {
    contractInstance.deployed()
    .then(async function(instance) {
      await instance.FinalizeAgreement({from : "0xaf78e0aca50724cee845ba5e5ac256a20ae57ed8"});//hard-coded address
      return instance;
    }).then(function(result) {
      dispatch(finalizeContract(result))
      alert("Transaction successful!")
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
