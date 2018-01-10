const express = require('express');
const http = require('http')
const socketIO = require('socket.io')
const bodyParser = require('body-parser');
const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000 ;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket)=> {
    console.log('New user connected')
  
    socket.emit('WelcomeMessage', {
        from: 'Admin',
        text:'Welcome to the chat app',
        createdAt: new Date().getTime()
    })
    socket.broadcast.emit('NewUser', {
        from: 'Admin',
        text:'New User Joined',
        createdAt: new Date().getTime()
    })
    socket.on('CreateMessage', (message)=>{
        console.log('CreateMessage', message)
        // io.emit('NewMessage', {
        //     from: message.from,
        //     text:message.text,
        //     createdAt: new Date().getTime()
        // })
        socket.broadcast.emit('NewMessage', {
            from: message.from,
            text:message.text,
            createdAt: new Date().getTime()
        })
    })
    socket.on('disconnect', ()=>{
        console.log('User disconnected')
    })
})

app.use(express.static(publicPath));
server.listen(port, ()=> {
    console.log(`Chat App listening at ${port}`)
})