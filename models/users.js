const sql = require("../config/sqlConnection.js");

// constructor
const User = function(user) {
  this.username = user.username;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    console.log(newUser)
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created channel: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};


module.exports = User;