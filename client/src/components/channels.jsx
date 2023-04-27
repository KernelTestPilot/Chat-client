import React, { useState } from "react";
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
  <div className="uk-child-width-expand@s" uk-grid>
      <ul className="uk-list uk-list-divider">
        
      {channels.map(channel => {
  if (typeof channel.channelname !== 'undefined') {
    return (
      <li className="uk-list" key={channel.channelid}>
        <Link className='text-link' to={`/channels/${channel.channelid}`}>
          <div>
            #{channel.channelname}
          </div>
        </Link>
      </li>
    );
  } else {
    return null; // or render a default value or handle the case as desired
  }
})}
    </ul>
  </div>
  );
};







export default Channels;