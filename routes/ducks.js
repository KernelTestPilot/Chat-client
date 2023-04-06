module.exports = app => {

  const router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
  const chat = require("../controller/chatcontroller.js")
        
  

  // Create a new user
router.post("/createuser", user.create );

router.put("/channel", channel.create );

router.post("/channel", chat.create );


router.get("/channel", channel.findAll );

router.get("/channel/:id", channel.findOne);

router.delete("/channel/:id", channel.delete);
//channels

  app.use('/ducks/api', router);
};

  