import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import UserService from "../services/UserService";
const Channel = ({data}) => {

  const [msg, setMsg] = useState([]);
  const [id, setId] = useState([]);

  let { channelid } = useParams();

  useEffect(() => {
    getmsg();
  }, [channelid])
  
  const getmsg = (id) => {
    UserService.getOneChannel(channelid)
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
      <div>
        {
        msg.length  ?
        msg.map((msgs, index) =>
        <div> <div><p>{msgs.username}</p>  </div>

      <div> <p>{msgs.msg}</p> </div></div>
        )
        :  <p>No Tags listed for this entry.</p>
        }
      </div>
    </div>
  )
}

export default Channel;