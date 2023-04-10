const User = require("../models/users.js");

const auth = require("./authcontroller.js");
const sql = require("../config/sqlConnection.js");

exports.create = (req, res) => {
  // Validate request
  console.log("testsets")
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a user
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send("sucess");
  });


};
  exports.login = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
   
    User.login(username,password, (err, data) => {
    
        if (username && password) {
            if (err) throw err;
          if (data.username == username && data.password == password) {
              //find the current role of a user
            //set a jwt token with generate function
          const token =  auth.generate(data.username, data.userid, data.rolename)
           const user = {token: token ,username: data.username,role: data.rolename}
           console.log(user)
             res.status(200).send(user)

            // res.send(req.session.loggedin);
          } else {
            res.status(400).send("Wrong username or password")
          }
        res.end();
        }
        else {
        res.status(400).send("Please enter your password")
		  res.end();
        }
    
      });
      
  };