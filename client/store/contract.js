const SwapAgreementFactory = require('../../build/contracts/SwapAgreementFactory.json')
const contract = require('truffle-contract')
import Web3 from 'web3'
const web3 = new Web3(window.web3.currentProvider)
const factoryContractInstance = contract(SwapAgreementFactory)//This creates an instance of our contract. ***ONLY ONE INSTANCE SHOULD BE CREATED***

//Action Types
const GET_CONTRACT = 'GET_CONTRACT'
const FINALIZE_CONTRACT = 'FINALIZE_CONTRACT' 

//Action Creators
const getContract = contract => ({type: GET_CONTRACT, payload: contract})
const finalizeContract = contract => ({type: FINALIZE_CONTRACT, payload: contract})

//Thunk Creators
export const fetchContract = web3 => {
  web3.currentProvider && factoryContractInstance.setProvider(web3.currentProvider)
  return dispatch => {
    factoryContractInstance// This is grabbing THE ONLY ONE factory contract instance from line 5.
      .deployed()//truffle-contract method to make instance calls
      .then(async instance => {
        await instance.createSwapAgreement({from : '0x3c5b478DE8302218a6fc0d186f53a025fA932Cd0'})//creating SwapAgreement(child) contract instances
        instance = await instance 
        dispatch(getContract(instance))//Factory Contract is being saved to the state(NEED TO BE FIXED TO SINGLE SWAPAGREEMENT CONTRACT)
        return instance
      })
      .then(instance => console.log('deployed agreements: ', instance.getDeployedSwapAgreements.call()))//console logging all deployed swapagreements
  }
}

export const finalizeContractThunk = contractInstanceAddress => {//take in contract instance address
  return dispatch => {
    SwapAgreement.at("0x09bcd84e91790bfc82cbf9bd16983386807ea3d9")
    .then(instance => console.log(instance))
    // .deployed()
    // .then(async function(instance) {
    //   console.log(instance.GetAgreement())
    //   await instance.FinalizeAgreement({from : ''});//hard-coded address
    //   return instance;
    // }).then(function(result) {
    //   console.log(result)
    //   dispatch(finalizeContract(result))
    //   alert("Transaction successful!")
    // })
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
