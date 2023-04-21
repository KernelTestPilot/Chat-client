import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
import { SocketContext } from '../context/socketprovider';

const Message = ({data}) => {

  let { channelid } = useParams();
  const socket = useContext(SocketContext); 

  const [channel, setChannel] = useState(channelid);

  const initialUserState = {
    msg: null,
    userid: data.userid,
    channelid: null,
    username: data.username
  };

  const [msg, setMsg] = useState(initialUserState);
  
  useEffect(() => {
    setChannel(channelid)
  }, [channelid]);

  useEffect(() => {
    // here we can use socket events and listeners
    return () => socket.disconnect(); //cleanup
}, [])

  const sendmsg = (data, channelid) => {
    var data = {
      msg: msg.msg,
      userid: msg.userid,
      channelid: channel,
      username: msg.username
    };
    UserService.CreateChat(data,channelid)
      .then(response => {
        socket.emit('message', data);

      })
      .catch(e => {

      });
  };
  
  const handleInputChange = event => {
   
    const { name, value } = event.target;
    setMsg({ ...msg, [name]: value });
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