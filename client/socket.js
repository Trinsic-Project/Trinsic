import io from 'socket.io-client';
import store, { enterCurrentDM, submitMessage } from './store';

const socket = io(window.location.origin)

socket.on('new-message', message => {
  store.dispatch(submitMessage(message));
})

socket.on('new-direct-message-chat', negotiation => {
  store.dispatch(enterCurrentDM(negotiation));
})


export default socket
