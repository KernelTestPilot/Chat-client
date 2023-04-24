const Chat = require("../models/chats.js");
const Socket = require("../server.js");

const connectedSockets = new Map();

Socket.io.on('connection',  (socket) => {
  
  console.log("socket connected") 
  socket.on('join', function(room, username){
    const prevRoom = connectedSockets.get(socket.id);
    if (prevRoom) {
      socket.leave(prevRoom);
    }
    socket.join(room)  
    connectedSockets.set(socket.id,{ 
      room: room,
      username: username
    });
    const onlineUsers = Array.from(connectedSockets.values())
    .filter(user => user.room === room);
    Socket.io.to(room).emit('onlineUsers', onlineUsers);
    
;})
socket.on('leaveRoom', (roomName) => {
  socket.leave(roomName);
  connectedSockets.delete(socket.id);
  const onlineUsers = Array.from(connectedSockets.values())
  .filter(user => user.room === roomName);
  Socket.io.to(roomName).emit('onlineUsers', onlineUsers);
  console.log(`Client ${socket.id} left room "${roomName}"`);
});
socket.on('message', function(msg){
  console.log("sending msg to room:" + msg.msg  + msg.channelid)
  const roomId = connectedSockets.get(socket.id).room;
  if (roomId === msg.channelid) {
  Socket.io.to(roomId).emit('new message', msg );
  }
});
socket.on('disconnect', () => {
  connectedSockets.delete(socket.id);
  socket.disconnect();


  //Socket.io.emit('onlineUsers', Array.from(connectedSockets.values()));

});
})


exports.create = (req, res) => {
    const chat = new Chat({
      channelid: req.body.channelid,
      userid: req.body.userid,
      msg: req.body.msg
    });
  
    Chat.create(chat, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      else 
      res.send("success");
    });
  };