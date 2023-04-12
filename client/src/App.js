import './App.css';
import { Routes, Route, useParams, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";
import io from 'socket.io-client';

import Channels from "./components/channels";
import Channel from "./components/channel";
import Messages from "./components/messages";
import Login from "./components/login";
import useToken from "./components/useToken";

const socket = io.connect('http://localhost:5000/'); // server connection
socket.onAny((event, ...args) => {
  console.log(event, args);
});
function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
     <div> hejsan</div>
     <div className="container mt-3">
     <Routes>
          <Route path="/login" element={<Login setToken={setToken}/>} />
        </Routes>
      </div>
      <div className="channelHeader">
        <h1>SELECTED CHANNELS NAME</h1>
      </div>
      <div className="channelMessages">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/channels/" element={<Channels token={token}/>} />

            <Route path="/channels/:channelid" element={<Channels />} />
          </Routes>
          <p>ALL MESSAGES FOR SELECTED CHANNEL WILL GO HERE</p>
      </div>
    </div>
  );
}

export default App;