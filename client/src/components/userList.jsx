import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
import Message from "./message";
import { SocketContext } from '../context/socketprovider';

const UserList = ({data}) => {

  const socket = useContext(SocketContext);

  const [id, setId] = useState([]);

  let { channelid } = useParams();

  const [onlineUsers, setOnlineUsers] = useState([]);

  


  useEffect(() => {

    socket.on('onlineUsers',  (users) => {

        
        setOnlineUsers(users);
      
  
    });
    return () => {
      socket.off('onlineUsers');
    };
  }, [channelid]);

 


  return (
    
      <div>
        <h1>Online Users:</h1>
      <ul>
        {onlineUsers.map((user) => (
          <li key={user.socketId}>
            {user.username ? user.username : 'Anonymous'}
          </li>
        ))}
      </ul>

      
      </div>
      
  )
}

export default UserList;