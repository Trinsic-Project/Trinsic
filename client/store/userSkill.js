import axios from 'axios';

// ACTION TYPES
const SET_SKILL = 'SET_SKILL';

// ACTION CREATORS
export const setSkill = skill => ({type: SET_SKILL, payload: skill})

// THUNK CREATORS
export const postSkillThunk = skillId => dispatch => {
  return axios
  .post(`/api/users/skills/${skillId}`)
    .then(res => res.data)
    .then(skill => {
      dispatch(setSkill(skill))
    })
}

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_SKILL:
      return action.payload;
    default:
      return state;
  }
}
