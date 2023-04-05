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
    console.log(newChannel)
    console.log("created channel: ", { id: res.insertId, ...newChannel });
    result(null, { id: res.insertId, ...newChannel });
  });
};

Channel.getAll = result => {
  sql.query("SELECT channelid, channelname FROM channels", (err, res) => {
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
  sql.query(`SELECT userid, msg FROM Messages WHERE channelid = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found tutorial: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};


module.exports = Channel;