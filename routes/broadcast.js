module.exports = app => {

  const router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
  const chat = require("../controller/chatcontroller.js");
  const broadcast = require("../controller/broadcastcontroller.js");
  
  const auth = require("../controller/authcontroller.js");
  // Post a broadcast message
  router.post("/", broadcast.create );
//auth
  router.post("/login", user.login );

  // Get all previous broadcastes
  router.get("/", broadcast.findOne );

  router.get("/welcome", auth.verifyToken, (req, res, next) => {
    broadcast.findOne(req, res);
    //res.status(200).send("Welcome 🙌 ");
  });

  app.use('/ducks/api/broadcast', router);
};

  