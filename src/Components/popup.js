import React from 'react'

function Popup(props) {
  function handleTrigger(){
    props.trigger = false;
  }
  return (props.trigger) ? (
    <div className='popup'>
      <div className='popup_content'>
        {props.children}
      </div>
      <div className='closebutton' onClick = {() => props.setTrigger(false)}></div>
    </div>
  ) : "";
}

export default Popup;
