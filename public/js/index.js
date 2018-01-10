var socket = io();
socket.on('connect', function (){
    console.log('Connected to server')
  
    socket.emit('CreateMessage', {
        from: 'Kamal@a.com',
        text:'Iam client Thanks'
    })
})
socket.on('disconnect', function (){
    console.log('Disconnected from server')
})

socket.on('NewMessage', function (message){
    console.log('NewMessage Received', message)
})

socket.on('WelcomeMessage', function (message){
    console.log('WelcomeMessage Received', message)
})

socket.on('NewUser', function (message){
    console.log('NewUser Received', message)
})