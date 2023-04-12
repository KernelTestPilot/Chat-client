import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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
  console.log(data)
  console.log({msg})
  return (
    <div>
      <button onClick={getmsg} className="channelBtn">
        <h3>{data.channelname}</h3>
        <small>{data.channeltheme}</small>
      </button>
      <div>
        {msg.shift()}
        {msg.map(msgs => (
          <div className="asd">
          <p>
            {msgs.msg}
          </p>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Channel;