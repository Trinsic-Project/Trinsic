import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import contract from './contract'
import currentDirectMessageChat from './currentDirectMessageChat'
import allDirectMessageChats from './allDirectMessageChats'
import message from './message'
import messages from './messages'
import tutor from './tutor.js'
import allTutors from './allTutors'
import sideBar from './sideBar'
import match from './match'
import skills from './skills'
import userSkill from './userSkill'

const reducer = combineReducers({
  user,
  contract,
  currentDirectMessageChat,
  allDirectMessageChats,
  message,
  messages,
  tutor,
  allTutors,
  sideBar,
  match,
  skills,
  userSkill
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './contract'
export * from './currentDirectMessageChat'
export * from './allDirectMessageChats'
export * from './message'
export * from './messages'
export * from './tutor'
export * from './allTutors'
export * from './sideBar'
export * from './match'
export * from './skills'
export * from './userSkill'
