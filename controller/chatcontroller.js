const Chat = require("../models/chats.js");

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
      else res.send("success");
    });
  };