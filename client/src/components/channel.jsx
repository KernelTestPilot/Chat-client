import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserService from "../services/UserService"
import { SocketContext } from '../context/socketprovider';

const Channel = ({data}) => {

  const socket = useContext(SocketContext);
  
  const [msg, setMsg] = useState([]);

  let { channelid } = useParams();

  

  const joinRoom = (id) => {
    socket.emit('join', id, data.username);
    getmsg();
  }
  const leaveRoom = (id) => {
    socket.emit('leaveRoom', id);
  }

  useEffect(() => {
  
  joinRoom(channelid);
  return () => {
    leaveRoom(channelid)
    return () => socket.disconnect();
  };
  }, [channelid]);

  useEffect(() => {
    socket.on('new message', (value) => {
      var data = {
            msg: value.msg,
            username: value.username,
      }
      setMsg(prevState => [...prevState, data]);
    });
    return () => socket.disconnect();
}, [])



  const getmsg = (id) => {
    UserService.getOneChannel(channelid)
      .then(response => {
        setMsg([msg, ...response.data])
       
      })
      .catch(e => {

      });
  };
  
  const peerConnection = new RTCPeerConnection();


  const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
}

try {
    const stream = openMediaDevices({'video':true,'audio':true});
    console.log('Got MediaStream:', stream);
} catch(error) {
    console.error('Error accessing media devices.', error);
}

const callUser = async (room) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    socket.emit("call-user", {
        offer,
        to: room
      });
  }
  
  socket.on("call-made", async data => {
   if(data.offer){
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("make-answer", { 
        answer,
        to: data.room
      });
   }
  });
  
  const remoteVideo = document.querySelector('video#remoteVideo');

peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});

  socket.on("answer-made", async data => {
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  });
  
  return (
    <div>
          <div class="video-container">
            <video autoplay class="remote-video" id="remoteVideo"></video>
            <video autoplay muted class="local-video" id="local-video"></video>
          </div>
        <button onClick={() => callUser(channelid)} className="btn btn-success">
            call
          </button>
   
       
<div className="discord-messages">

        {
        msg.length  ?
        msg.map((msgs, index) =>
          <div key={index} className="discord-message">
    
            
           <div className="discord-author-avatar" >
            
            <img src="https://i.imgur.com/0TeacfY.png" alt="Girl in a jacket" />
           
           </div>
           
           <div className="discord-author-username">
           <strong>{msgs.username }</strong>
           
           <div className="discord-message-content"> 
          <div className="discord-message-body ">{msgs.msg}</div>
          </div>

   
            
            </div>
          </div>
        )
        :  <p>No Tags listed for this entry.</p>
        }
      
      </div>
      </div>
      
  )
}

export default Channel;