import { useState } from "react";
import { useNavigate } from "react-router-dom";
function HomePage() {
  const navigate=useNavigate();
  const [roomInput,setRoomInput]=useState("");
function handleCreate(){
  const id= Math.random().toString(36).substring(2,8);
  navigate(`/room/${id}`);
}
function handleJoin(){
  navigate(`/room/${roomInput}`);
}
  return (
    <div>
      <h1>Home</h1>

      <button onClick={handleCreate}>Create Meeting</button>
      
      <input type="text" value={roomInput}
      onChange={function(e) {setRoomInput(e.target.value);}}
      ></input>
      <button onClick={handleJoin}>Join Meeting</button>

    </div>
  );
}

export default HomePage;