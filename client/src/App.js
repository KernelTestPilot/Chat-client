import './App.css';
import { Routes, Route, useParams, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";

import Channels from "./components/channels";
import Channel from "./components/channel";
import Messages from "./components/messages";
import Login from "./components/login";
import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();
  let { id } = useParams();
  console.log(id);

  return (
    <div className="container">
      <div className="channelList">
        <h3>LIST OF CHANNELS</h3>
        <Routes>
            <Route path="/channels/" element={<Channels token={token}/>} />
        </Routes>
      </div>
      <div className="channelHeader">
        <h1>SELECTED CHANNELS NAME</h1>
      </div>
      <div className="channelMessages">
          <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/channels/:id" element={<Channel />} />
          </Routes>
          <p>ALL MESSAGES FOR SELECTED CHANNEL WILL GO HERE</p>
      </div>
    </div>
  );
}

export default App;