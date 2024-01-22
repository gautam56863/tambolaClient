import React from 'react';
 
const Ticket = ({ ticketNumbers, onNumberClick }) => {
  console.log(ticketNumbers);
  return (
    <table className="ticket">
      <tbody className='ticket_content'>
        {ticketNumbers.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((number, colIndex) => (
              <td key={colIndex} onClick={() => onNumberClick(number, rowIndex, colIndex)} className={number === 0 ? 'empty-cell' : ''}>
                {number!== 0 && number!==-1 && number}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
 
export default Ticket;