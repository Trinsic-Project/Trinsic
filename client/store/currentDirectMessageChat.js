import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES;
const ENTER_DM = "ENTER_DM";
const GET_NEGOTIATIONS = "GET_NEGOTIATIONS"

// ACTION CREATORS;
export const enterCurrentDM = negotiation => ({type: ENTER_DM, payload: negotiation});
export const getNegotiations = () => ({type: GET_NEGOTIATIONS, payload: negotiations})

// THUNKS;
export const enterCurrentDMThunk = () => dispatch => {
  return axios.post('/api/negotiations')
    .then(res => res.data)
    .then(newNegotiation => dispatch(enterCurrentDM(newNegotiation)))
    .catch(err => console.log(err));
}

export const fetchNegotiationsThunk = () => dispatch => {
  return axios.get('/api/users/negotiations')
    .then(res => res.data)
    .then(negotiations => dispatch(getNegotiations(negotiations)))
    .catch(err => console.log(err));
}

//REDUCERS;
export default function(state = "", action) {
  switch (action.type) {
    case ENTER_DM:
      return action.payload;
    case GET_NEGOTIATIONS:
      return action.payload;
    default:
      return state;
  }
}
