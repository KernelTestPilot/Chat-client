const Channel = require("../models/channels.js");



exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Channel
  const channel = new Channel({
    channelname: req.body.name,
    channeltheme: req.body.theme,
  });

  // Save Channel in the database
  Channel.create(channel, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send("sucess");
  });
};

exports.findAll = (req, res) => {
  Channel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving channels."
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Channel.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Channel with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Channel with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};
  