const Broadcast = require("../models/broadcast.js");

exports.findOne = (req, res) => {
    Broadcast.findById((err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Channel`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Channel "
          });
        }
      } else res.send(data);
    });
  };

  exports.create = (req, res) => {
    const broadcast = new Broadcast({
      channelid: req.body.channelid,
      userid: req.body.userid,
      msg: req.body.msg
    });
  
    Broadcast.create(broadcast, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the message."
        });
      else res.send("success");
    });
  };