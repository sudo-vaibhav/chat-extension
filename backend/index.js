// const cors = require('cors')
const app = require('express')()
// app.use(cors())
const httpServer = require('http').createServer(app)
const options = {
  /* ... */ cors: {
    origin: '*',
  },
}
const io = require('socket.io')(httpServer, options)
// io.origins('*:*')

io.on('connection', (socket) => {
  /* ... */
  console.log('connection established')
  socket.on('joinRoom', (url, options = {}) => {
    socket.join(url)
    console.log('joined room ', url)
    console.log(url, options)
  })

  socket.on('message', ({ url, options = {}, message, sender }) => {
    console.log('message received')
    io.to(url).emit('message', {
      sender,
      message,
    })
    console.log(url, options, message, sender)
  })
  io.to('some room').emit('some event')
})

httpServer.listen(8000)
// WARNING !!! app.listen(8000); will not work here, as it creates a new HTTP server
