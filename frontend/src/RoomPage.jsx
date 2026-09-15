import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import CodeMirror from "@uiw/react-codemirror";
import { java } from "@codemirror/lang-java";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import "./RoomPage.css";

function RoomPage() {
  const { roomId } = useParams();
  const [textContent, setTextContent] = useState("type here");
  const socketRef = useRef(null);
  const zegoContainerRef = useRef(null);

  // Socket.io integration
  useEffect(() => {
    socketRef.current = io("http://localhost:3001");
    socketRef.current.emit("join room", roomId);

    socketRef.current.on("text update", (data) => {
      setTextContent(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  // ZEGOCloud integration
  useEffect(() => {
    let zegoInstance = null;

    const myMeeting = async () => {
     
      const appID = 921739617; // 
      const serverSecret = "d9b75fee14a7fa376505ef571f2c970e";

      // Generate kit Token
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        Date.now().toString(), // Unique User ID
        `User_${Math.floor(Math.random() * 1000)}` // User Name
      );

      // Create instance and join room
      zegoInstance = ZegoUIKitPrebuilt.create(kitToken);
      
      if (zegoContainerRef.current) {
        zegoInstance.joinRoom({
          container: zegoContainerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.GroupCall, // Or ZegoUIKitPrebuilt.OneONoneCall
          },
          showScreenSharingButton: true,
          showPreJoinView: false, // Set to true if you want a preview/device setup screen first
        });
      }
    };

    myMeeting();

    return () => {
      if (zegoInstance) {
        zegoInstance.destroy();
      }
    };
  }, [roomId]);

  return (
    <div className="room-container">
      <div className="editor-section">
        <h1>Room: {roomId}</h1>
        <CodeMirror
          value={textContent}
          extensions={[java()]}
          onChange={(value) => {
            setTextContent(value);
            socketRef.current.emit("text update", value);
          }}
        />
      </div>

      <div className="video-section">
        <div
          ref={zegoContainerRef}
          style={{ width: "100%", height: "100%", minHeight: "400px" }}
        />
      </div>
    </div>
  );
}

export default RoomPage;