const tracker = require('./tracker')

const express = require('express')
const app = express()

const server = require('http').createServer(app)

const io = require('socket.io')(server)

const port = 8080

server.listen(port, () => {
  console.log('Server running on port %d', port)
})

app.use(express.static('public'))

const instance = tracker()

io.on('connection', socket => {
  socket.emit('round-update', instance.current().getPlayerView())

  const update = () => socket.broadcast.emit('round-update', instance.current().getPlayerView())

  socket.on('set-actors', actors => { 
    console.log('setting actors', actors)
    instance.current().setActors(actors)
    update()
  })

  socket.on('new-round', () => { 
    console.log('new Round')
    instance.newRound() 
    update()
  })

  socket.on('next', () => {
    console.log('next round')
    instance.current().next()
    update()
  })

  socket.on('prev', () => {
    console.log('prev round')
    instance.current().previous()
    update()
  })

  })