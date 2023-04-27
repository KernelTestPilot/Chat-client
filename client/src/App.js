import './App.css';
import { Routes, Route} from "react-router-dom";
import React from "react";
import Message from "./components/message";
import Channels from "./components/channels";
import Channel from "./components/channel";
import Login from "./components/login";
import UserList from "./components/userList";
import Rtc from "./components/rtc";

import useToken from "./components/useToken";
import { socket, SocketContext } from './context/socketprovider';


function App() {
  const { token, setToken } = useToken();

  return (
    <div className="uk-container">
<div className="content row">
<div className="uk-width-1-1 main">
  
<div className="uk-grid uk-grid-small uk-grid-width-small-1-5 uk-grid-width-small-1-10 uk-grid-width-1-3">      
          <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>} />

            <Route path="/rtc" element={
                 <>
            <SocketContext.Provider  value={socket}> 
            <Rtc data={token}/>           
           </SocketContext.Provider>
             </>} />
             
            <Route path="/channels/:channelid" element={
            <>
             <SocketContext.Provider  value={socket}> 

           <div className="uk-width-1-6">
            <Channels/>
            </div>
         
             <div className="uk-width-2-3">
             <Channel data={token}/>
             <Message data={token}  />
             </div>
            
             <div className="uk-width-1-6">
             <UserList data={token}  />
             </div>
	    	</SocketContext.Provider>
            </>
            
            } />
            <Route path="/channels/" element={<Channels token={token}/>} />
      
          </Routes>
          </div>
   </div>
    </div>
    </div>
  );
}

export default App;