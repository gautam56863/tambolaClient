import board from './img/host-board.png'
function Finished(){
    return (
        <div className = "player-bg-board">
            <img src = {board} alt = "Board"/>
            <div className='stars'></div>
            <div className='trophy'></div>
            <div className='thank-text'>Game Over</div>
        </div>
    )
}

export default Finished;