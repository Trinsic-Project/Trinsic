import Web3 from 'web3'

//Metamask sets older version of Web3. Code below grabs provider from metamask and utilizes our version of Web3
const establishWeb3 = async () => {
  await window.addEventListener('load', () => {
    //If browser has Web3 provider, extract the provider and make a new instance or create a new instance with the localhost
    let web3 =
      typeof window.web3 !== 'undefined'
        ? new Web3(window.web3.currentProvider)
        : new Web3.providers.HttpProvider('localhost:8080')
    return {web3} //Determine if wrapping is neccessary
  })
}

//Action Types
const GET_WEB3 = 'GET_WEB3'

//Action Creators
const getWeb3 = web3 => ({type: GET_WEB3, payload: web3})

//Thunk Creators
export const fetchWeb3 = () => dispatch => {
  establishWeb3
    .then(results => {
      dispatch(getWeb3(results.web3))
    })
    .catch(err => console.log(err))
}

//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_WEB3:
      return action.payload
    default:
      return state
  }
}
