import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES;
const ENTER_DM = "ENTER_DM";

// ACTION CREATORS;
export const enterCurrentDM = negotiation => ({type: ENTER_DM, payload: negotiation});

// THUNKS;
export const enterCurrentDMThunk = () => dispatch => {
  return axios.post('/api/negotiations')
    .then(res => res.data)
    .then(newNegotiation => dispatch(enterCurrentDM(newNegotiation)))
    .catch(err => console.log(err));
}

//REDUCERS;
export default reducer(state = "", action) {
  switch (action.type) {
    case ENTER_DM:
      return action.payload;
    default:
      return state;
  }
}
