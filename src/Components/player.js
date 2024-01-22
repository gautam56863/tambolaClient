import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import Header from './Header.jsx';
import  Ticket  from './Ticket.jsx';
import  Controls  from './Controls.jsx';
import { generateTicket } from '../utils/tambolaUtils.jsx'
import { io } from "socket.io-client"
import board from './img/host-board.png'
// const socket = io("http://localhost:4567");


const initialValue = 'X';
function Player({userName, avatar}){
  const location = useLocation();
  const playerName = location.state.data[0];
  const navigate = useNavigate();
  const [currentNumber, setCurrentNumber] = useState(initialValue);
  const [ticketNumbers, setTicketNumbers] = useState(generateTicket());
  const [firstRow, setFirstRow] = useState(4);  // stores the no of -1s and zeroes
  const [secondRow, setSecondRow] = useState(4);// stores the no of -1s and zeroes
  const [thirdRow, setThirdRow] = useState(4);  // stores the no of -1s and zeroes

  useEffect(() => {
    const socket = io('http://localhost:4567');
      socket.emit("join-room",location.state.data[2]);
      socket.on("recieve-random-number", num => {
        // console.log(num);
        setCurrentNumber(num);
    })
    return () => {
      socket.emit('leave-room', location.state.data[2]);
      socket.disconnect();
    };
  }, []);

  
  // socket.emit("join-room",location.state.data[2]);
  // console.log(socket.id);
  // socket.on("recieve-random-number", num => {
    // console.log(num);
  //   setCurrentNumber(num);
  // })
  // console.log(currentNumber);

  if(currentNumber == 100){
    navigate("/finished");  
  }

  //For reload confirmation
  const [confirmedLeave, setConfirmedLeave] = useState(false);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!confirmedLeave) {
        const message = "Are you sure you want to leave? Your progress will be lost.";
        event.returnValue = message;
        return message;
      }
    };
 
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [confirmedLeave]);


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
    console.log(firstRow, secondRow, thirdRow);
    if(firstRow === 9 && secondRow === 9 && thirdRow === 9) {
      alert('Full House Done!!')
      navigate('/finished');
    }
    else {
      alert('Not Yet Housefull!!')
    }
  };
 
  const handleFirstRowClick = () => {
    if(firstRow === 9) {
      alert('First Row Completed!!');
    }
    else {
      alert('Row not yet empty!!')
    }
  };

    const handleSecondRowClick = () => {
    if(secondRow === 9) {
      alert('Second Row Completed!!');
    }
    else {
      alert('Row not yet empty!!')
    }
  };

    const handleThirdRowClick = () => {
    if(thirdRow === 9) {
      alert('Third Row Completed!!');
    }
    else {
      alert('Row not yet empty!!')
    }
  };
  // const socket = io('http://localhost:4567');
  // socket.on("recieve-random-number", num => {
  //   setCurrentNumber(num);
  // })
  
  return (
    <div className='player-bg-board'>
      <img src = {board} alt = "Board"/>
      <Header playerName = {playerName} currentNumber = {currentNumber}/>
      <Ticket ticketNumbers = {ticketNumbers} onNumberClick = {handleNumberClick} />
      <Controls onHousefullClick = {handleHousefullClick} onFirstRowClick = {handleFirstRowClick} onSecondRowClick = {handleSecondRowClick} onThirdRowClick = {handleThirdRowClick}/>
    </div>
  );
}

export default Player;
