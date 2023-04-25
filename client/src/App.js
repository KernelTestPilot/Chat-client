import './App.css';
import { Routes, Route, useParams, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";
import Message from "./components/message";
import Channels from "./components/channels";
import Channel from "./components/channel";
import Login from "./components/login";
import UserList from "./components/userList";
import useToken from "./components/useToken";
import { socket, SocketContext } from './context/socketprovider';


function App() {
  const { token, setToken } = useToken();

  return (
    <div className="uk-container">
<div class="content row">
<div className="uk-width-1-1 main">
  
<div class="uk-grid uk-grid-small uk-grid-width-small-1-5 uk-grid-width-small-1-10 uk-grid-width-1-3">      
          <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/channels/:channelid" element={
            <>
             <SocketContext.Provider  value={socket}> 
           <div class="uk-width-1-6">
            <Channels/>
            </div>
         
             <div class="uk-width-2-3">
             <Channel data={token}/>
             <Message data={token}  />
             </div>
            
             <div class="uk-width-1-6">
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