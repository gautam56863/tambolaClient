import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import board from './img/host-board.png';

const initialValue = 'X';
function Host(){
    const [randomNumber , setRandomNumber] = useState(initialValue);
    const [isDisabled , setIsDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const numbers = [];
    const [isSocketAcive, setIsSocketAcive] = useState(null);

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

    useEffect(() => {
        const socket = io("http://localhost:4567");
        setIsSocketAcive(socket);
        return () => {
        socket.emit("random-number",100,data.data[2]);
        socket.emit("delete-room", data.data[2]);
        if (socket) {
        socket.disconnect();
      }
        };
    }, []);
    
    for(let i = 1 ; i <= 90 ; i++){
        numbers.push(i);
    }
    const [nums , setNums] = useState(numbers);

    // const socket = io("http://localhost:4567");
    
    function handleRandomClick(){
        if(nums.length == 0){
            navigate("/finished");
        }
        const randomIndex = Math.floor(Math.random()*nums.length);
        const randomValue = nums[randomIndex];
        setRandomNumber(randomValue);
        isSocketAcive.emit("random-number", randomValue,data.data[2]);

        // GENERATE NEXT NUMBER BUTTON disbaled for next 5 seconds
        setIsDisabled(true);
        setTimeout(() => {
            setIsDisabled(false);
        }, 1000);

        const temp_nums = nums.filter(num => num !== randomValue);
        setNums(temp_nums);
    }

    function handleEndClick(){
        const confirmEndGame = window.confirm('Are you sure you want to end the game?');
        if(confirmEndGame) {
            isSocketAcive.emit("random-number",100,data.data[2]);
            navigate("/finished");
        }
    }

    return (
        <div className="hostpage">
            <img src = {board} alt="Board"/>
            <div className = "host_header">{data.data[0]}</div>
            <div className = "host_content">
                <div className = "generated_number" >{randomNumber}</div>
                <div className="host_buttons">
                    <button className={isDisabled ? 'black' : 'gamebutton'} onClick = {() => handleRandomClick()} disabled={isDisabled}>GENERATE A RANDOM NUMBER</button>
                    <div className="gamebutton red" onClick = {() => handleEndClick()}>END GAME</div>
                </div>
                
            </div>
        </div>
    )
}

export default Host;