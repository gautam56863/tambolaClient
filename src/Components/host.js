import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client"
import board from './img/host-board.png'
// const socket = io("http://localhost:4567");

const initialValue = 'X';
function Host(){
    const [randomNumber , setRandomNumber] = useState(initialValue);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const numbers = [];
    


    useEffect(() => {
        const socket = io("http://localhost:4567");
            // function SendRandomNumber(){
            //     socket.emit("random-number", randomValue,data.data[2]);
            // }
        return () => {
            // console.log("1="+data.data[2]);
        socket.emit("random-number",100,data.data[2]);
        socket.emit("delete-room", data.data[2]);
        socket.disconnect();
        };
    }, []);

    for(let i = 1 ; i <= 90 ; i++){
        numbers.push(i);
    }
    const [nums , setNums] = useState(numbers);

    const socket = io("http://localhost:4567");
    
    function handleRandomClick(){
        if(nums.length == 0){
            navigate("/finished");
        }
        const randomIndex = Math.floor(Math.random()*nums.length);
        const randomValue = nums[randomIndex];
        setRandomNumber(randomValue);
        socket.emit("random-number", randomValue,data.data[2]);
        const temp_nums = nums.filter(num => num !== randomValue);
        setNums(temp_nums);
    }

    function handleEndClick(){
        socket.emit("random-number",100,data.data[2]);
        navigate("/finished");
    }

    return (
        <div className="hostpage">
            <img src = {board} alt="Board"/>
            <div className = "host_header">{data.data[0]}</div>
            <div className = "host_content">
                <div className = "generated_number" >{randomNumber}</div>
                <div className="host_buttons">
                    <div className="gamebutton green" onClick = {() => handleRandomClick()}>GENERATE A RANDOM NUMBER</div>
                    <div className="gamebutton red" onClick = {() => handleEndClick()}>END GAME</div>
                </div>
                
            </div>
        </div>
    )
}

export default Host;