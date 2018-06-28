import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES;
const ENTER_DM = "ENTER_DM";
const GET_DM = "GET_DM"

// ACTION CREATORS;
export const enterCurrentDM = negotiation => ({type: ENTER_DM, payload: negotiation});
export const getCurrentDM = negotiation => ({type: GET_DM, payload: negotiation});


// THUNKS;
export const enterCurrentDMThunk = () => dispatch => {
  return axios.post('/api/negotiations')
    .then(res => res.data)
    .then(newNegotiation => {
      dispatch(enterCurrentDM(newNegotiation));
      socket.emit('new-direct-message-chat', newNegotiation);
    })
    .catch(err => console.log(err));
}

export const fetchCurrentDMThunk = () => dispatch => {
  return axios.get('/api/negotiations/:id')
    .then(res => res.data)
    .then(currNegotiation => {
      dispatch(getCurrentDM(currNegotiation));
    })
    .catch(err => console.log(err));
}


//REDUCERS;
export default function(state = {}, action) {
  switch (action.type) {
    case ENTER_DM:
      return action.payload;
    case GET_DM:
      return action.payload;
    default:
      return state;
  }
}
