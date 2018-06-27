import axios from 'axios';

// ACTION TYPES;
const GET_NEGOTIATIONS = "GET_NEGOTIATIONS"

// ACTION CREATORS;
export const getNegotiations = negotiations => ({type: GET_NEGOTIATIONS, payload: negotiations})

// THUNKS;
export const fetchNegotiationsThunk = () => dispatch => {
  return axios.get('/api/users/negotiations')
    .then(res => res.data)
    .then(negotiations => dispatch(getNegotiations(negotiations)))
    .catch(err => console.log(err));
}

//REDUCERS;
export default function(state = [], action) {
  switch (action.type) {
    case GET_NEGOTIATIONS:
      return action.payload;
    default:
      return state;
  }
}
