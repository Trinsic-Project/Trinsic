import axios from 'axios';

// ACTION TYPES
const GET_SKILLS = 'GET_SKILLS';

// ACTION CREATORS
export const getSkills = skills => ({ type: GET_SKILLS, payload: skills });

// THUNK CREATORS
export const fetchSkills = () => dispatch => {
  return axios
  .get(`/api/users/skills`)
    .then(res => res.data)
    .then(skills => {
      dispatch(getSkills(skills));
    });
};

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case GET_SKILLS:
      return action.payload;
    default:
      return state;
  }
}
