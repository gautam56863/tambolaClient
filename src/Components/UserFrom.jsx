import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, useNavigate } from 'react-router-dom';
import { io } from "socket.io-client"
import board from './img/host-board.png'

const socket = io("http://localhost:4567"); 
const AvatarSelection = ({ onSelectAvatar }) => {
  const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png', 'avatar4.png', 'avatar5.png'];
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
 
  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };
 
  return (
    <div>
      <h2>Select an Avatar</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            style={{ cursor: 'pointer', border: selectedAvatar === avatar ? '2px solid blue' : 'none' }}
            onClick={() => handleAvatarClick(avatar)}
          />
        ))}
      </div>
      <button onClick={() => onSelectAvatar(selectedAvatar)}>Select Avatar</button>
    </div>
  );
};
 
const EnterRoomPage = () => {
  const [userName, setUserName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();
 
  const handleEnterRoom = () => {
    // console.log(socket.id);
    socket.emit("join-room",roomId);
    socket.on("Error",errorMessage=>{
      if(errorMessage === "Incorrect RoomId") {
        alert(errorMessage);
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
          <input className='name-box-text' placeholder="enter name" type="text" onChange={(e) => setUserName(e.target.value)} />
        </div>
        <div className='name-box2'>
          <input className='name-box-text' placeholder="room id" type="text" onChange={(e) => setRoomId(e.target.value)} />
        </div>
        <button className="create-room-btn green" type="button" onClick={handleEnterRoom}>
          Enter Room
        </button>
      </form>
      </div>
    </div>
  );
};

 
export default EnterRoomPage;