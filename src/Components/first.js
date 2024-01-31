import {useNavigate} from "react-router-dom";
import { useState } from "react";
import Popup from "./popup";
import malechar from './img/malechar.png'
import malechar2 from './img/malechar2.png'
import tambola from './img/tambola.png'

function First(){
    const navigate = useNavigate();
    const [triggerState,setTriggerState] = useState(false);
    function handlePlayerClick(){
        navigate("/enter-room");
    }
    function handleHostClick(){
        navigate("/create-room");
    }

    return (
        <div className="firstpage">
            <div class="title">
                <img src={tambola} alt="Host"/>
            </div>
            <div className="identity_buttons">
                <div class="hostpart">
                    <div class="male-char1">
                        <img src={malechar} alt="Host"/>
                    </div>
                    <div class="game-button red" onClick = {() => handleHostClick()}>Host</div>
                </div>
                <div className="playerpart">
                    <div class="game-button green" onClick = {() => handlePlayerClick()}>Player</div>
                    <div class="male-char2">
                        <img src={malechar2} alt="Host"/>
                    </div>
                </div>
            </div>
            <div class="game-button blue" onClick = {()=> setTriggerState(true)}>How to Play?</div>
            <Popup trigger = {triggerState} setTrigger = {setTriggerState}>
                <h1 className="rules-txt">Rules</h1>
                
                <p><b>1.Room Creation:</b>The game begins as the host creates a room for players to join.</p>
                
                <p><b>2.Single Room Policy:</b>Each respective room accommodates all players until the game concludes.</p>

                <p><b>3.Ticket Distribution:</b>Every player receives a unique 3×9 ticket with numbers ranging from 1 to 90.</p>

                <p><b>4.Authorized Number Cutting:</b>Players are permitted to cut numbers only if announced by the host. </p>
                
                <p><b>5.Time-Frame for Cutting:</b>Number cutting is exclusively allowed between two consecutive number calls, ensuring fair play.</p>

                <p><b>6.Full-House Claim:</b>Players may claim Full-House status only when all numbers on their ticket have been cut.</p>
                
                <p><b>7.Row Claim Protocol:</b>A player can assert a row victory if all numbers in that specific row have been successfully cut.</p>
                
                <p><b>8.Host's Game Control:</b>The host retains the sole authority to conclude the game after its designated end.</p>
                <br></br>
                <br></br>
                <p><b>Note:</b>Adhering to these rules ensures a smooth and fair Tambola gaming experience. May the numbers be in your favor.</p>
            </Popup>
        </div>
    )
}

export default First;