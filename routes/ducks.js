module.exports = app => {

    var router = require("express").Router();
    const user = require("../controller/usercontroller.js");
    const channel = require("../controller/channelcontroller.js");
          
    

    // Create a new user
  router.post("/createuser", user.create );

  router.put("/channel", channel.create );

//channels

    app.use('/ducks', router);
  };

  