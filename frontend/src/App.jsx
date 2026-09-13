import { Routes,Route } from "react-router-dom";
import HomePage from "./HomePage"
import RoomPage from "./RoomPage"
import JitsiTest from "./JitsiTest";
function App(){
    

    
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:roomId" element={<RoomPage/>}/>
            <Route path="/test" element={<JitsiTest/>}/>
        </Routes>
    );
}
export default App;