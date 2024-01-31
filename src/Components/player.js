import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Header from './Header.jsx';
import  Ticket  from './Ticket.jsx';
import  Controls  from './Controls.jsx';
import { generateTicket } from '../utils/tambolaUtils.jsx'
import { io } from "socket.io-client"
import board from './img/host-board.png'
import AlertPopup from './AlertPopup.js';
import success from './img/success.jpg'
import alert from './img/alert.png'


const initialValue = 'X';
function Player(){
  const location = useLocation();
  const playerName = location.state.data[0];
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(initialValue);
  const [ticketNumbers, setTicketNumbers] = useState(generateTicket());
  const [firstRow, setFirstRow] = useState(4);  
  const [secondRow, setSecondRow] = useState(4);
  const [thirdRow, setThirdRow] = useState(4);  
  const [triggerState,setTriggerState] = useState(false);
  const [displayMessage , setDisplayMessage] = useState("Hello");
  const [messagePic , setMessagePic] = useState(0);
  const [house , setHouse] = useState(1);
  const [rowOne , setRowOne] = useState(1);
  const [rowTwo , setRowTwo] = useState(1);
  const [rowThree , setRowThree] = useState(1);
  const [isSocketAcive, setIsSocketAcive] = useState(null);

  useEffect(() => {
    const socket = io('http://localhost:4567');
    socket.emit("join-room",location.state.data[2]);
    
    socket.on("recieve-random-number", num => {
      setCurrentNumber(num);
    });
    socket.on("full-house-done",no=>{
      setHouse(no);
    });
    socket.on("row-1-done",no=>{
      setRowOne(no);
    });
    socket.on("row-2-done",no=>{
      setRowTwo(no);
    });
    socket.on("row-3-done",no=>{
      setRowThree(no);
    });
    setIsSocketAcive(socket);
    return () => {
      socket.emit('leave-room', location.state.data[2]);
      if (socket) {
      socket.disconnect();
      }
    };
  }, []);

  if(currentNumber == 100){
    navigate("/finished");  
  }

  //For reload confirmation
  useEffect(() => {
      const handleBeforeUnload = (event) => {
        event.preventDefault();
        const message = "Reloading the site would take you out of the game!!"
        event.returnValue = message;
        return message;
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, []);

  const handleNumberClick = (number, rowIndex, colIndex) => {
    if(number === currentNumber) {
      const updatedTicketNumbers = [...ticketNumbers];
      updatedTicketNumbers[rowIndex][colIndex] = 'X';
      setTicketNumbers(updatedTicketNumbers);
      if(rowIndex === 0) setFirstRow(firstRow+1);
      if(rowIndex === 1) setSecondRow(secondRow+1);
      if(rowIndex === 2) setThirdRow(thirdRow+1);
    }
  };
  
  const handleHousefullClick = () => {
    if(firstRow === 9 && secondRow === 9 && thirdRow === 9) {
      setMessagePic(1);
      setDisplayMessage("Full House Done!!");
      setTriggerState(true);
      isSocketAcive.emit("Full-House",0,location.state.data[2]);
      navigate('/finished'); 
    }
    else {
      setMessagePic(0);
      setDisplayMessage("Not Yet Housefull!!");
      setTriggerState(true);
    }
  };
 
  const handleFirstRowClick = () => {
    if(firstRow === 9) {
      setMessagePic(1);
      setDisplayMessage("First Row Completed!!");
      isSocketAcive.emit("Row-1",0,location.state.data[2]);
    }
    else {
      setMessagePic(0);
      setDisplayMessage("Row-1 not completed yet!!");
    }
    setTriggerState(true);
  };

  const handleSecondRowClick = () => {
    if(secondRow === 9) {
      setMessagePic(1);
      setDisplayMessage("Second Row Completed!!");
      isSocketAcive.emit("Row-2",0,location.state.data[2]);
    }
    else {
      setMessagePic(0);
      setDisplayMessage("Row-2 not completed yet!!");
    }
    setTriggerState(true);
  };

  const handleThirdRowClick = () => {
    if(thirdRow === 9) {
      setMessagePic(1);
      setDisplayMessage("Third Row Completed!!");
      isSocketAcive.emit("Row-3",0,location.state.data[2]);
    }
    else {
      setMessagePic(0);
      setDisplayMessage("Row-3 not completed yet!!");
    }
    setTriggerState(true);
  };
  
  return (
    <>
      <div className='player-bg-board'>
        <img src = {board} alt = "Board"/>
        <Header playerName = {playerName} currentNumber = {currentNumber}/>
        <Ticket ticketNumbers = {ticketNumbers} onNumberClick = {handleNumberClick} />
        <Controls onHousefullClick = {handleHousefullClick} onFirstRowClick = {handleFirstRowClick} onSecondRowClick = {handleSecondRowClick} onThirdRowClick = {handleThirdRowClick} house = {house} rowOne = {rowOne} rowTwo = {rowTwo} rowThree = {rowThree}/>
      </div>
      <AlertPopup trigger = {triggerState} setTrigger = {setTriggerState}>
        <img src = {messagePic ? success : alert} width={100} height={100} Alt = "Popup" />
        <p>{displayMessage}</p>
      </AlertPopup>
    </>
  );
}

export default Player;
