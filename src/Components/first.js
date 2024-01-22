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
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi porro excepturi possimus libero esse vel ipsum atque itaque pariatur, alias commodi eveniet nam rem, sint consequuntur voluptas, corporis aliquam tempgnissimos molestiae ut itaque perspiciatis accusamus laudantium delectus cum blanditiis laborum commodi, impedit ad totam. Hic praesentium est delectus.</p>
            </Popup>
        </div>
    )
}

export default First;