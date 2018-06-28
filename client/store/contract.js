const SwapAgreementFactory = require('../../build/contracts/SwapAgreementFactory.json')
const SwapAgreement = require('../../build/contracts/SwapAgreement.json')
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
        await instance.createSwapAgreement({from : '0xEB723e6723606382F35E21497716419eC2F0d7d4'})//creating SwapAgreement(child) contract instances
        instance = await instance 
        dispatch(getContract(instance))//Factory Contract is being saved to the state(NEED TO BE FIXED TO SINGLE SWAPAGREEMENT CONTRACT)
        return instance
      })
      .then(instance => {
        let currentAgreement;
        instance.getDeployedSwapAgreements.call()
        .then(agreements => {
          currentAgreement = agreements[agreements.length-1]
          console.log(agreements)
          console.log(currentAgreement)
          return currentAgreement
        })
        .then(async instanceAddress => {
          console.log("@@@@@@ß")
          let instance = contract({abi: SwapAgreement.abi, address: instanceAddress})
          instance.setProvider(web3.currentProvider)
          instance.deployed().then(a=>console.log("@@@@@@", a))
        })
        // console.log('deployed agreements: ', deployedAgreements)//console logging all deployed swapagreements
      })
  }
}

export const finalizeContractThunk = contractInstanceAddress => {//take in contract instance address
  let currentInstance = contract({abi: SwapAgreement.abi, address: contractInstanceAddress})
  web3.currentProvider && currentInstance.setProvider(web3.currentProvider)
  return dispatch => {
    currentInstance.deployed()
    .then(instance => {
      console.log(instance)
    })
    // console.log(SwapAgreement.at(contractInstanceAddress))
    // .then(instance => console.log(instance))
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
