const Chat = require("../models/chats.js");
const Socket = require("../server.js");

const connectedSockets = new Map();

Socket.io.on('connection',  (socket) => {
  console.log("socket connected") 
  socket.on('join', function(room){
    const prevRoom = connectedSockets.get(socket.id);
    if (prevRoom) {
      socket.leave(prevRoom);
    }
    socket.join(room)  
    connectedSockets.set(socket.id, room);
    console.log("joined room id:" + room)

;})
socket.on('message', function(msg){
  console.log("sending msg to room:" + msg.channelid)
  const roomId = connectedSockets.get(socket.id);
  if (roomId) {
  Socket.io.to(roomId).emit('new message', msg );
  }
});
socket.on('disconnect', () => {
  connectedSockets.delete(socket.id);

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