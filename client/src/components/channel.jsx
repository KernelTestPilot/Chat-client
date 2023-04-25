import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
import Message from "./message";
import { SocketContext } from '../context/socketprovider';

const Channel = ({data}) => {

  const socket = useContext(SocketContext);
  
  const [msg, setMsg] = useState([]);

  const [id, setId] = useState([]);

  let { channelid } = useParams();

  

  const joinRoom = (id) => {
    socket.emit('join', id, data.username);
    getmsg();
  }
  const leaveRoom = (id) => {
    socket.emit('leaveRoom', id);
  }

  useEffect(() => {
  
  joinRoom(channelid);
  return () => {
    leaveRoom(channelid)
    return () => socket.disconnect();
  };
  }, [channelid]);

  useEffect(() => {
    socket.on('new message', (value) => {
      var data = {
            msg: value.msg,
            username: value.username,
      }
      setMsg(prevState => [...prevState, data]);
    });
    return () => socket.disconnect();
}, [])



  const getmsg = (id) => {
    UserService.getOneChannel(channelid)
      .then(response => {
        setMsg([msg, ...response.data])
       
      })
      .catch(e => {

      });
  };
  return (
    
       
<div class="discord-messages">

        {
        msg.length  ?
        msg.map((msgs, index) =>
          <div className="discord-message">
    
            
           <div className="discord-author-avatar" >
            
            <img src="https://i.imgur.com/0TeacfY.png" alt="Girl in a jacket" />
           
           </div>
           
           <div className="discord-author-username">
           <strong>{msgs.username }</strong>
           
           <div className="discord-message-content"> 
          <div className="discord-message-body ">{msgs.msg}</div>
          </div>

   
            
            </div>
          </div>
        )
        :  <p>No Tags listed for this entry.</p>
        }
      
      </div>
      
  )
}

export default Channel;