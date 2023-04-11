import './App.css';
import { Routes, Route, Link} from "react-router-dom";
import React, { useState,  useEffect } from "react";

import Channels from "./components/channels";
import Login from "./components/login";
import useToken from "./components/useToken";

function App() {
  const { token, setToken } = useToken();

  return (
    <div className="App">
     <div> hejsan</div>
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
