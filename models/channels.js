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


module.exports = Channel;