import axios from 'axios';

// ACTION TYPES
const GET_MESSAGES = 'GET_MESSAGES';

// ACTION CREATORS
export const getMessages = messages => ({ type: GET_MESSAGES, payload: messages });

// THUNK CREATORS
export const fetchMessages = negotiationId => dispatch => {
  return axios.get(`/api/messages/${negotiationId}`)
    .then(res => res.data)
    .then(messages => {
      dispatch(getMessages(messages));
    });
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.messages;
    default:
      return state;
  }
}
