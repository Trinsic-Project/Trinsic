import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'

/**
 * INITIAL STATE
 */

const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, payload: user})
const removeUser = () => ({type: REMOVE_USER})
const updateUser = user => ({type: UPDATE_USER, payload: user})

/**
 * THUNK CREATORS
 */
export const me = () => dispatch =>
  axios
    .get('/auth/me')
    .then(res => {
      dispatch(getUser(res.data || defaultUser))
      return res.data
    })
    .catch(err => console.error(err))

export const auth = (email, password, method, firstName, lastName) => dispatch =>
  axios
    .post(`/auth/${method}`, {email, password, firstName, lastName})
    .then(
      res => {
        dispatch(getUser(res.data))
        history.push('/home')
      },
      authError => {
        // rare example: a good use case for parallel (non-catch) error handler
        dispatch(getUser({error: authError}))
      }
    )
    .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

export const putUser = (user, id) => dispatch => 
    axios
      .put(`/api/users/${id}`, user)
      .then(res => res.data)
      .then(updatedUser => {
        const action = updateUser(updatedUser)
        dispatch(action)
      })

export const logout = () => dispatch =>
  axios
    .post('/auth/logout')
    .then(_ => {
      dispatch(removeUser())
      history.push('/login')
    })
    .catch(err => console.error(err))

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload
    case UPDATE_USER:
      return action.payload
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
