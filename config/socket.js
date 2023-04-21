const Socket = require("../server.js");


Socket.io.on('connection',  (socket) => {
  console.log("socket connected") 

  socket.on('message', function(message){
    
    socket.broadcast("new message", message)
})
})