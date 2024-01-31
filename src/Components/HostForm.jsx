import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"
import board from './img/host-board.png'
import AlertPopup from './AlertPopup';
import alert from './img/alert.png';

const socket = io("http://localhost:4567"); 

const EnterHostPage = () => {
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [roomId, setRoomId] = useState('');
  const [triggerState , setTriggerState] = useState(false);
  const navigate = useNavigate();
 
  const handleCreateRoom = () => {
      socket.emit("Create-room",roomId);
      socket.on("Room Already Created",errorMessage=>{
      if(errorMessage == "Room Already Created") {
        setTriggerState(true);
      }
      else {
        const array = [userName, selectedAvatar,roomId];
        navigate(`/host`, {state:{data:array}});
      }
    });
  };
 
  return (
    <div >
      <div className='player-bg-board'>
      <form>
        <img src = {board} alt = "Board"/>
        <div className='player_header'>Host</div>
        <div className='name-box'>
          <input className='name-box-text' placeholder="Host name" type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='name-box2'>
          <input className='name-box-text' placeholder="room id" type="text" onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <button className="create-room-btn green" type="button" onClick={handleCreateRoom}>
          Create Room
        </button>
      </form>
      </div>
      <AlertPopup trigger = {triggerState} setTrigger = {setTriggerState}>
        <img src = {alert} width={100} height={100} Alt = "Popup" />
        <p>Room with this Id had already been created</p>
      </AlertPopup>
    </div>
  );
};

 
export default EnterHostPage;