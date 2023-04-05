module.exports = app => {

  var router = require("express").Router();
  const user = require("../controller/usercontroller.js");
  const channel = require("../controller/channelcontroller.js");
        
  

  // Create a new user
router.post("/createuser", user.create );

router.put("/channel", channel.create );

router.get("/channel", channel.findAll );

router.get("/channel/:id", channel.findOne);
//channels

  app.use('/ducks/api', router);
};

  