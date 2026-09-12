import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
function RoomPage() {
  const { roomId } = useParams();
  const [textContent, setTextContent] = useState("");
  const socketRef=useRef(null);
  useEffect(function() {
    socketRef.current=io("http://localhost:3001");
    console.log("connected, socket id will be set shortly");
    socketRef.current.emit("join room", roomId);
    socketRef.current.on("text update", function(data) {
  setTextContent(data);
});
  },[]);
  return (
    <div>
      <h1>Room: {roomId}</h1>
      <textarea value={textContent} 
      onChange={function(e){setTextContent(e.target.value)
        socketRef.current.emit("text update", e.target.value);
      }}></textarea>
    </div>
  );
}

export default RoomPage;