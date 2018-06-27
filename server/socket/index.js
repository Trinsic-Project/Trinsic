module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('new-message', message => {
      socket.emit('new-message', message)
    })

    socket.on('new-direct-message-chat', negotiation => {
      socket.emit('new-direct-message-chat', negotiation)
    })

    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
