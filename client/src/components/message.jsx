import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000/'); // server connection
socket.onAny((event, ...args) => {
  console.log(event, args);
});
const Message = ({data}) => {

  let { channelid } = useParams();

  const [channel, setChannel] = useState(channelid);

  const initialUserState = {
    msg: null,
    userid: data.userid,
    channelid: null,
  };
  const [msg, setMsg] = useState(initialUserState);
  
  useEffect(() => {
    setChannel(channelid)
    console.log(data.userid)
  }, [channelid]);

  const sendmsg = (data, channelid) => {
    var data = {
      msg: msg.msg,
      userid: msg.userid,
      channelid: channel,
    };
    UserService.CreateChat(data,channelid)
      .then(response => {
       console.log(response)
       socket.emit('message', {});

      })
      .catch(e => {

      });
  };
  
  const handleInputChange = event => {
   
    const { name, value } = event.target;
    setMsg({ ...msg, [name]: value });
    console.log({msg})
  };
  return (
      <div>
       <div>
          
          <div className="form-group">
            <label htmlFor="description">msg</label>
            <input
              type="text"
              className="form-control"
              id="msg"
              required
              onChange={handleInputChange}
              value={msg.msg}
              name="msg"
            />
          </div>

          <button onClick={sendmsg} className="btn btn-success">
            Send msg
          </button>
        

          </div>
      </div>
  )
}

export default Message;