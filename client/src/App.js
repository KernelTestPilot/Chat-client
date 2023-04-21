import './App.css';
import { Routes, Route, useParams, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";
import Message from "./components/message";
import Channels from "./components/channels";
import Channel from "./components/channel";
import Login from "./components/login";
import useToken from "./components/useToken";
import { socket, SocketContext } from './context/socketprovider';


function App() {
  const { token, setToken } = useToken();

  return (
    <div className="site">
      <div className="channelHeader">
        <h1>BACKENDEX</h1>
      </div>
        <div className="channelContainer">

          <Routes>
          
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/channels/:channelid" element={
            <>
             
             <SocketContext.Provider  value={socket}> 
             <Channel data={token}/>
          <Message data={token}  />
          <Channels/>
	    	</SocketContext.Provider>
     
          
            </>
            
            } />
            <Route path="/channels/" element={<Channels token={token}/>} />
      
          </Routes>
     
        </div>
    </div>
  );
}

export default App;