const sql = require("../config/sqlConnection.js");

// constructor
const Channel = function(channel) {
  this.channelname = channel.channelname;
  this.channeltheme = channel.channeltheme;
};

Channel.create = (newChannel, result) => {
  sql.query("INSERT INTO channels SET ?", newChannel, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log("created channel: ", { id: res.insertId, ...newChannel });
    result(null, { id: res.insertId, ...newChannel });
  });
};

Channel.getAll = result => {
  sql.query("SELECT channelid, channelname, channeltheme FROM channels", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("channels: ", res);
    result(null, res);
  });
};

Channel.findById = (id, result) => {
  sql.query(`SELECT chat.msg, users.username FROM chat INNER JOIN users ON chat.userid = users.userid WHERE channelid = ${id} ORDER BY chat.msgid`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
     // console.log("found channel: ", res);
      result(null, res);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Channel.remove = (id, result) => {
  sql.query("DELETE FROM channels WHERE channelid = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted channel with id: ", id);
    result(null, res);
  });
};

module.exports = Channel;
