const sql = require("../config/sqlConnection.js");

const Chat = function(chat) {
    this.channelid = chat.channelid;
    this.userid = chat.userid;
    this.msg = chat.msg;
  };
  
  Chat.create = (newMessage, result) => {
    sql.query("INSERT INTO chat SET ?", newMessage, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      //console.log("created chat message: ", { id: res.insertId, ...newMessage });
      result(null, { id: res.insertId, ...newMessage });
    });
  };

  module.exports = Chat;