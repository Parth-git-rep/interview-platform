import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
function RoomPage() {
  const { roomId } = useParams();
  const [textContent, setTextContent] = useState("type here");
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
      <CodeMirror
          value={textContent}
          extensions={[java()]}
          onChange={function(value) {
            setTextContent(value);
            socketRef.current.emit("text update",value);
          }}
    />
    </div>
  );
}

export default RoomPage;