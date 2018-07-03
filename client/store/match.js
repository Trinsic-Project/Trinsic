import axios from 'axios';

// ACTION TYPES
const MATCH_TUTOR = 'MATCH_TUTOR';

// ACTION CREATORS
export const matchTutor = status => ({ type: MATCH_TUTOR, payload: status});

// THUNK CREATORS

export const fetchLike = (userId, tutorId) => dispatch => {
  return axios
  .put(`/api/match/${userId}`, {tutorId})
    .then(res => res.data)
    .then(status => {
      console.log(status)
      dispatch(matchTutor(status));
    });
};

// REDUCER
export default function (state = [], action) {
  switch (action.type) {
    case MATCH_TUTOR:
    return [...state, action.payload];
    default:
      return state;
  }
}
