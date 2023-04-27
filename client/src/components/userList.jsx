import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from '../context/socketprovider';

const UserList = ({data}) => {

  const socket = useContext(SocketContext);

  let { channelid } = useParams();

  const [onlineUsers, setOnlineUsers] = useState([]);

  


  useEffect(() => {

    socket.on('onlineUsers',  (users) => {

        console.log(users)
        setOnlineUsers(users);
        console.log(users)
  
    });
    return () => {
      socket.off('onlineUsers');
    };
  }, [channelid]);

 


  return (
    
    <div className="uk-child-width-expand@s" uk-grid>
  
    
        {onlineUsers.map((user) => (
          <div key={user.id} className="uk-card-small  uk-card-body">
         <strong>	   {user.username ? user.username : 'Anonymous'}</strong>
            </div>
        ))}
    

      
      </div>
      
  )
}

export default UserList;