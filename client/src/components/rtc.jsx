import React, { useContext } from "react";
import { SocketContext } from '../context/socketprovider';

const Rtc = ({data}) => {

  const socket = useContext(SocketContext);

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

async function playVideoFromCamera() {
    try {
        const constraints = {'video': true, 'audio': true};
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        const videoElement = document.querySelector('video#localVideo');
        videoElement.srcObject = stream;
    } catch(error) {
        console.error('Error opening video camera.', error);
    }
}
const callUser = async (room) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
    room = "1";
    socket.emit("call-user", {
        offer,
        to: room
      });
  }
  
  socket.on("call-made", async data => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(data.offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit("make-answer", { 
        answer,
        to: data.room
      });
  });
  
  const remoteVideo = document.querySelector('#remoteVideo');

peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});


playVideoFromCamera();

  const room = "1";
  return (
    
       <div>
        <video id="localVideo" autoplay playsinline controls="false"/>
        <div class="video-container">
            <video autoplay class="remote-video" id="remoteVideo"></video>
            <video autoplay muted class="local-video" id="local-video"></video>
          </div>
        <button onClick={() => callUser(room)} className="btn btn-success">
            call
          </button>
        
       </div>

      
  )
}

export default Rtc;