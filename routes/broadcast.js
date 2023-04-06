module.exports = app => {

  const router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
  const chat = require("../controller/chatcontroller.js");
  const broadcast = require("../controller/broadcastcontroller.js");
  
  // Post a broadcast message
  router.post("/", broadcast.create );

  // Get all previous broadcastes
  router.get("/", broadcast.findOne );


  app.use('/ducks/api/broadcast', router);
};

  