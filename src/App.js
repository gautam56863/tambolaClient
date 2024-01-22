import { BrowserRouter, Routes, Route } from "react-router-dom";
import First from "./Components/first";
import Host from "./Components/host";
import Finished from "./Components/finished";
import Player from "./Components/player";

import './App.css';
import EnterRoomPage from "./Components/UserFrom";
import EnterHostPage from "./Components/HostForm";

function App() {
  return (
    <div className = "app">
      <BrowserRouter>
         <Routes>
           <Route path = "/" element = {<First />} />
           <Route path = "/create-room" element = {<EnterHostPage />} />
           <Route path = "/host" element = {<Host />} />
           <Route path="/enter-room" element= {<EnterRoomPage/>} />
           <Route path="/player" element = {<Player/>} />
           <Route path = "/finished" element = {<Finished />} />
           <Route path = "/*" element = {<h1>Error</h1>} />
         </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
