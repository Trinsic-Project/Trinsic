import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import web3 from './web3'
import contract from './contract'
import currentDirectMessageChat from './currentDirectMessageChat'
import allDirectMessageChats from './allDirectMessageChats'
import message from './message'
import submitMessage from './submitMessage'
import messages from './messages'


const reducer = combineReducers({
  user,
  web3,
  contract,
  currentDirectMessageChat,
  allDirectMessageChats,
  message,
  submitMessage,
  messages
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './web3'
export * from './contract'
export * from './currentDirectMessageChat'
export * from './allDirectMessageChats'
export * from './message'
export * from './submitMessage'
export * from './messages'
