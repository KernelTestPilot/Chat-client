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

        console.log(users)
        setOnlineUsers(users);
      
  
    });
    return () => {
      socket.off('onlineUsers');
    };
  }, [channelid]);

 


  return (
    
    <div class="uk-child-width-expand@s" uk-grid>
  
    
        {onlineUsers.map((user) => (
          <div class="uk-card-small  uk-card-body">
         <strong>	   {user.username ? user.username : 'Anonymous'}</strong>
            </div>
        ))}
    

      
      </div>
      
  )
}

export default UserList;