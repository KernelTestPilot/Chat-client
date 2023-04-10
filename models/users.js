const sql = require("../config/sqlConnection.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.login = (username, password, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }else{
      console.log("Nothing found");
      result(null,res);
      return;
    }
  });
};



function getRole(userid) {
  sql.query(`SELECT rolename FROM roles INNER JOIN users ON roles.roleid = users.roleid WHERE userid = ${userid}`, (err, res) => {
    if (res.length) {
      console.log("found role: ", res[0]);
      return res[0];
    }else{
      console.log("Nothing found");
      return;
    }
  });
}


module.exports = User;