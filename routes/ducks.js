module.exports = app => {

  const router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
  const chat = require("../controller/chatcontroller.js")
    
  // Create a new user

  router.post("/login", user.login );
  
  router.put("/", channel.create );
  router.post("/:id", chat.create );
  router.get("/", channel.findAll );
  router.get("/:id", channel.findOne);
  router.delete("/:id", channel.delete);

  //channels
  app.use('/ducks/api/channel', router);
};
