import axios from 'axios';

// ACTION TYPES
const GET_TUTOR = 'GET_TUTOR';

// ACTION CREATORS
export const getSingleTutor = tutor => ({ type: GET_TUTOR, payload: tutor });

// THUNK CREATORS
export const fetchSingleTutor = tutorId => dispatch => {
  return axios
  .get(`/api/users/${tutorId}`)
    .then(res => res.data)
    .then(tutor => {
      dispatch(getSingleTutor(tutor));
    });
};

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case GET_TUTOR:
      return action.payload;
    default:
      return state;
  }
}
