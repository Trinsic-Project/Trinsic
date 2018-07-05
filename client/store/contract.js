const SwapAgreement = require('../../build/contracts/SwapAgreement.json')
const contract = require('truffle-contract')
import Web3 from 'web3'
const web3 = new Web3(window.web3.currentProvider)
const contractInstance = contract(SwapAgreement)
import axios from 'axios';

//Action Types
const GET_CONTRACT = 'GET_CONTRACT'
const FINALIZE_CONTRACT = 'FINALIZE_CONTRACT'
const RENDER_CONTRACT = 'RENDER_CONTRACT'

//Action Creators
const getContract = contract => ({type: GET_CONTRACT, payload: contract})
const finalizeContract = contract => ({
  type: FINALIZE_CONTRACT,
  payload: contract
})

const renderContract = contract => ({
  type: RENDER_CONTRACT,
  payload: contract
})

//Thunk Creators
export const fetchContract = (user, tutor)  => {
  web3.currentProvider && contractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    contractInstance
      .new(user.skills[0].name, {from: web3.eth.accounts[0]}) //The from address should grab from the initiator's metamask
      .then(async instance => {
        console.log(
          'This is intitialized contract instance address: ',
          instance.address
        )
        await dispatch(getContract(instance))
        return instance
      })
      .then(instance => {
        axios.post(`/api/users/contracts`, {contractAddress: instance.address, initiator: user, tutorId: tutor.id}) //, user1Id: , user2Id:
        return instance
      })
      .then(async instance => {
        await instance.GetAgreement().then(agreement => {
          dispatch(renderContract(agreement))
          console.log(
            'THIS SHOULD SHOW THE *INITIALIZED* AGREEMENT DETAILS: ',
            agreement
          )
        })
      })
  }
}

//get all contracts from backend that belong to the user, filter by contracts with other user, grab address. could create thunk that fetches all contracts when user logs in. when on a single users page, filter the contracts so it's only the contract with that particular tutor

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
      .then(instance => {
        console.log(instance)
        axios.post('/api/users/contracts/finalize', {contractAddress: contractInstanceAddress})
        return instance
      })
      .then(async instance => {
        await instance
          .GetAgreement()
          .then(agreement =>{
            dispatch(renderContract(agreement))
            console.log(
              'THIS SHOULD SHOW THE *FINALIZED* AGREEMENT DETAILS: ',
              agreement
            )}
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
    case RENDER_CONTRACT:
      console.log(action.payload)
      return {...state, contractInfo: action.payload}
    default:
      return state
  }
}
