const sql = require("../config/sqlConnection.js");

// constructor
const Broadcast = function(broadcast) {
  this.channelid = broadcast.channelid,
  this.userid = broadcast.userid,
  this.msg = broadcast.msg
  };

Broadcast.findById = (result) => {
    sql.query(`SELECT chat.msg, users.username FROM chat INNER JOIN users ON chat.userid = users.userid WHERE channelid = 1 ORDER BY chat.msgid`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found broadcasts: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    });
  };

  Broadcast.create = (newBroadcast, result) => {
    sql.query("INSERT INTO chat SET ?", newBroadcast, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log(newBroadcast)
      console.log("created chat message: ", { id: res.insertId, ...newBroadcast });
      result(null, { id: res.insertId, ...newBroadcast });
    });
  };

  module.exports = Broadcast;