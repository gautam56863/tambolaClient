import React from 'react'

export default function AlertPopup(props) {
    function handleTrigger(){
        props.trigger = false;
    }
    return (props.trigger) ? (
    <div className='alert_popup'>
        <div className='alert_popup_content'>
        {props.children}
        </div>
        <div className='closebutton' onClick = {() => props.setTrigger(false)}></div>
    </div>
    ) : "";
}
