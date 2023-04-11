module.exports = app => {

  const router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
  const chat = require("../controller/chatcontroller.js");
  const broadcast = require("../controller/broadcastcontroller.js");
  
  const auth = require("../controller/authcontroller.js");

//auth
  router.post("/login", user.login );

  router.get("/", auth.verifyToken, (req, res, next) => {
    broadcast.findOne(req, res);
    //res.status(200).send("Welcome 🙌 ");
  });

  router.post("/", auth.verifyToken, (req, res, next) => {
    if(req.user.role == "admin"){
      broadcast.create(req, res);
    }else res.status(400).send("not welcome")
  });

  app.use('/ducks/api/broadcast', router);
};

  