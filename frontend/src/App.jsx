import { Routes,Route } from "react-router-dom";
import HomePage from "./HomePage"
import RoomPage from "./RoomPage"

function App(){
    

    
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage/>}/>
        </Routes>
    );
}
export default App;