import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";
import io from 'socket.io-client';

import Channels from "./components/channels";
import Login from "./components/login";
import useToken from "./components/useToken";

const socket = io.connect('http://localhost:5000/'); // server connection
socket.onAny((event, ...args) => {
  console.log(event, args);
});
function App() {
  const { token, setToken } = useToken();
  const [newMsg, setMsg] = useState( []);

  const sendMsg = () => {
    socket.emit('message', (data) => {
      console.log(data)
    }); 
  }
  const mapToToState = (msg) => {
    setMsg([msg, ...newMsg] );

}
  useEffect(() => {
    socket.on('new message',  mapToToState)
  });

  return (

    <div className="App">
    { console.log({newMsg})}
     <div> hejsan</div>
     <button class="button is-link" onClick={sendMsg}>
      Send msg
    </button>
     <div className="container mt-3">
     <Routes>
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route path="/channels/" element={<Channels token={token}/>} />
        </Routes>
        </div>
    </div>
  );
}

export default App;
