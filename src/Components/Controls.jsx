const Controls = ({ onHousefullClick, onFirstRowClick, onSecondRowClick, onThirdRowClick, house, rowOne, rowTwo, rowThree }) => {
    return (
      <div className="controls">
        <button onClick={onHousefullClick} className = {house ? 'housefull' : 'house_black'} disabled = {!house}>Housefull</button>
        <button onClick={onFirstRowClick} className = {rowOne ? 'row1' : 'row_black'} disabled = {!rowOne}>Row-1</button>
        <button onClick={onSecondRowClick} className = {rowTwo ? 'row2' : 'row_black'} disabled = {!rowTwo}>Row-2</button>
        <button onClick={onThirdRowClick} className = {rowThree ? 'row3' : 'row_black'} disabled = {!rowThree}>Row-3</button>
      </div>
    );
  };
 
  export default Controls;