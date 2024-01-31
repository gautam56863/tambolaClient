import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"
import board from './img/host-board.png'
import AlertPopup from './AlertPopup';
import alert from './img/alert.png';

const socket = io("http://localhost:4567");
 
const EnterRoomPage = () => {
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
  const [triggerState , setTriggerState] = useState(false);
 
  const handleEnterRoom = () => {
    socket.emit("join-room",roomId);
    socket.on("Error",errorMessage=>{
      if(errorMessage === "Incorrect RoomId") {
        setTriggerState(true);
      }
      else {
        const array = [userName, selectedAvatar,roomId];
        navigate(`/player`, {state:{data:array}});
      }
    });
  };
 
  return (
    <div>
      <div className='player-bg-board'>
      <form>
        <img src = {board} alt = "Board"/>
        <div className='player_header'>User</div>
        <div className='name-box'>
          <input className='name-box-text' placeholder="user name" type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='name-box2'>
          <input className='name-box-text' placeholder="room id" type="text" onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <button className="create-room-btn green" type="button" onClick={handleEnterRoom}>
          Enter Room
        </button>
      </form>
      </div>
      <AlertPopup trigger = {triggerState} setTrigger = {setTriggerState}>
        <img src = {alert} width={100} height={100} Alt = "Popup" />
        <p>Incorrect RoomId!!</p>
      </AlertPopup>
    </div>
  );
};

 
export default EnterRoomPage;