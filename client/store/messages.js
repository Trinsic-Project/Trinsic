import axios from 'axios';
import socket from '../socket.js';

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES';
const SUBMIT_MESSAGE = "SUBMIT_MESSAGE";

// ACTION CREATORS
export const getMessages = messages => ({ type: GET_MESSAGES, payload: messages });
export const submitMessage = msg => ({type: SUBMIT_MESSAGE, payload: msg});

// THUNK CREATORS
export const fetchMessages = negotiationId => dispatch => {
  return axios.get(`/api/messages/${negotiationId}`)
    .then(res => res.data)
    .then(messages => {
      dispatch(getMessages(messages));
    });
};

export const submitMessageThunk = msg => dispatch => {
  return axios.post('/api/messages', msg)
    .then(res => res.data)
    .then(newMessage => {
        dispatch(submitMessage(newMessage));
        socket.emit('new-message', newMessage);
    })
    .catch(err => console.log(err));
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case SUBMIT_MESSAGE:
      return [...state, action.payload];
    default:
      return state;
  }
}
