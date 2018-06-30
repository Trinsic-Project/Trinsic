const SwapAgreement = require('../../build/contracts/SwapAgreement.json')
const contract = require('truffle-contract')
import Web3 from 'web3'
const web3 = new Web3(window.web3.currentProvider)
const contractInstance = contract(SwapAgreement)

//Action Types
const GET_CONTRACT = 'GET_CONTRACT'
const FINALIZE_CONTRACT = 'FINALIZE_CONTRACT'

//Action Creators
const getContract = contract => ({type: GET_CONTRACT, payload: contract})
const finalizeContract = contract => ({
  type: FINALIZE_CONTRACT,
  payload: contract
})

//Thunk Creators
export const fetchContract = web3 => {
  web3.currentProvider && contractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    contractInstance
      .new({from: web3.eth.accounts[0]}) //The from address should grab from the initiator's metamask
      .then(instance => {
        console.log(
          'This is intitialized contract instance address: ',
          instance.address
        )
        dispatch(getContract(instance))
        return instance
      })
      .then(async instance => {
        await instance.GetAgreement().then(agreement => {
          console.log(
            'THIS SHOULD SHOW THE *INITIALIZED* AGREEMENT DETAILS: ',
            agreement
          )
        })
      })
  }
}

//INCONSISTENTLY ABLE TO LOG FINALIZED CONTRACT DETAILS, SHOULD INVESTIGATE FURTHER LATER ON
export const finalizeContractThunk = contractInstanceAddress => {
  //take in contract instance address
  web3.currentProvider && contractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    contractInstance
      .at(contractInstanceAddress)
      .then(async instance => {
        await instance.FinalizeAgreement({
          from: web3.eth.accounts[0] //grabs metamask account
        })
        return instance
      })
      .then(async instance => {
        await instance
          .GetAgreement()
          .then(agreement =>
            console.log(
              'THIS SHOULD SHOW THE *FINALIZED* AGREEMENT DETAILS: ',
              agreement
            )
          )
        return instance
      })
      .then(instance => {
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
