import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { Link} from "react-router-dom";
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
  <div class="channelList">
    <h3 className="channelsHeader">CHANNELS:</h3><br />
    {channels.shift()}
    {channels.map(channel => (
      <Link to={`/channels/${channel.channelid}`}>
        <p>{channel.channelname}</p>
      </Link>
    ))}
  </div>
  );
};







export default Channels;