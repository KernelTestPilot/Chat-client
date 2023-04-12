import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";

const Messages = ({token}) => {
    const [messages, setMessages] = useState([]);
    const [isfetch, setFetch] = useState(true);
  
     const getMessages = () => {
          UserService.getOneChannel()
            .then(response => {
                setMessages([messages, ...response.data])
              setFetch(false)
  
            })
            .catch(e => {
  
            });
        };
      
        if(isfetch){
            getMessages();
        }
  
  return (
    <div>
      {messages.map((message) => {
        console.log(message)
        return (
          <Messages data = {message}/>
        )
      })}
  </div>
  
  
  
  )
  
  }

export default Messages;