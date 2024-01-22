const Controls = ({ onHousefullClick, onFirstRowClick, onSecondRowClick, onThirdRowClick }) => {
    return (
      <div className="controls">
        <button onClick={onHousefullClick} className="button housefull">Housefull</button>
        <button onClick={onFirstRowClick} className="button row1">Row-1</button>
        <button onClick={onSecondRowClick} className="button row2">Row-2</button>
        <button onClick={onThirdRowClick} className="button row3">Row-3</button>
      </div>
    );
  };
 
  export default Controls;