import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService";

const Channel = ({data}) => {
  const [msg, setMsg] = useState([]);

  const getmsg = (id) => {
    UserService.getOneChannel(data.channelid)
      .then(response => {
        setMsg([msg, ...response.data])


      })
      .catch(e => {

      });
  };

  return (
    <div>
          {console.log(data)}
          {console.log({msg})}
      <div>
        
      <button onClick={getmsg} className="btn btn-success">
            Login
          </button>
      <p> {data.channelname}</p>
        </div>
        <div>
      <p> {data.channeltheme}</p>
        </div>
    
    
    
    </div>

  



  )
}

export default Channel;