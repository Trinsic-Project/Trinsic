import axios from 'axios';

// ACTION TYPES;
const GET_ALL_TUTORS = "GET_ALL_TUTORS"

// ACTION CREATORS;
export const getAllTutors = tutors => ({type: GET_ALL_TUTORS, payload: tutors})

// THUNKS;
export const fetchAllTutorThunk = () => dispatch => {
  return axios.get('/api/users/')
    .then(res => res.data)
    .then(tutors => {
      console.log(tutors)
      dispatch(getAllTutors(tutors))})
    .catch(err => console.log(err));
}

//REDUCERS;
export default function(state = [], action) {
  switch (action.type) {
    case GET_ALL_TUTORS:
      return action.payload;
    default:
      return state;
  }
}
