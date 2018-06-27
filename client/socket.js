import io from 'socket.io-client';
import store, { enterCurrentDM, writeMessage } from '.store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new-message', message => {
    store.dispatch(writeMessage(message));
  })

  socket.on('new-direct-message-chat', negotiation => {
    store.dispatch(enterCurrentDM(negotiation));
  })

})

export default socket
