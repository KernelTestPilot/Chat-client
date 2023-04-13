import './App.css';
import { Routes, Route, useParams, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";
import io from 'socket.io-client';

import Channels from "./components/channels";
import Channel from "./components/channel";
import Login from "./components/login";
import useToken from "./components/useToken";

const socket = io.connect('http://localhost:5000/'); // server connection
socket.onAny((event, ...args) => {
  console.log(event, args);
});
console.log()
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
            <Route path="/channels/:channelid" element={<><Channel/><Channels/></>} />
            <Route path="/channels/" element={<Channels token={token}/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App;