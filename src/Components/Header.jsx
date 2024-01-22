const Header = ({ playerName, currentNumber }) => {
    return (
      <>
        <div className = "player_header">{playerName}</div>
        <div className="player_number">{currentNumber}</div>
      </>
    );
  };
export default Header;