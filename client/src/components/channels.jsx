import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import Channel from "./channel";

const Channels = ({token}) => {
  const [channels, setChannels] = useState([]);
  const [isfetch, setFetch] = useState(true);

   const getChannels = () => {
        UserService.getAllChannels()
          .then(response => {
            setChannels([channels, ...response.data])
            setFetch(false)

          })
          .catch(e => {

          });
      };
    
      if(isfetch){
        getChannels();
      }

return(

<div>
    <div className='container is-fluid is-Light'>

    {channels.map((channel) => {
      console.log(channel)
            return (
              <Channel data = {channel}/>
            )
          })}
        
    
        </div>
      
  </div>



)

}

export default Channels;