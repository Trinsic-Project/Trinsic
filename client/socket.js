import io from 'socket.io-client'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('new-message', message => {

  })

  socket.on('new-direct-message-chat', message => {

  })
  
})

export default socket
