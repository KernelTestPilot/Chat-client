const Socket = require("../server.js");


Socket.io.on('connection',  (socket) => {
  console.log("socket connected") 

  socket.on('message', function(message){
    const msg = "new msg"
    socket.broadcast("new message", msg)
})
})