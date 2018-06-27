import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES;
const SUBMIT_MESSAGE = "SUBMIT_MESSAGE";


// ACTION CREATORS;
export const submitMessage = msg => ({type: SUBMIT_MESSAGE, payload: msg});

// THUNKS;
export const submitMessageThunk = msg => dispatch => {
  return axios.post('/api/messages', msg)
    .then(res => res.data)
    .then(newMessage => {
      dispatch(submitMessage(newMessage))
      //socket.emit('new-message', newMessage);
    })
    .catch(err => console.log(err));
}

//REDUCERS;
export default function(state = {}, action) {
  switch (action.type) {
    case SUBMIT_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
