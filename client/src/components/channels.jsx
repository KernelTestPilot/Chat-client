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
            console.log(channels)
          })
          .catch(e => {

          });
      };
    
      if(isfetch){
        getChannels();
      }

return(
  <div class="uk-child-width-expand@s" uk-grid>
      <ul class="uk-list uk-list-divider">
        
    {channels.map(channel => (
          <li class="uk-list">
      <Link className='text-link' to={`/channels/${channel.channelid} `} >
        <div>
        #{channel.channelname}
        </div>
      </Link>
      </li>
    ))}
    </ul>
  </div>
  );
};







export default Channels;