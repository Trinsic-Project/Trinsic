import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES;
const WRITE_MESSAGE = "WRITE_MESSAGE";

// ACTION CREATORS;
export const writeMessage = msg => ({type: WRITE_MESSAGE, payload: msg});

// THUNKS;
export const writeMessageThunk = content => dispatch => {
  return axios.post('/api/messages', content)
    .then(res => res.data)
    .then(newMessage => dispatch(writeMessage(newMessage)))
    .catch(err => console.log(err));
}

//REDUCERS;
export default function(state = "", action) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
