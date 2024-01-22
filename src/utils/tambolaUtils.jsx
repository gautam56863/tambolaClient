const generateTicket = () =>  {
    // Create a 2D array [3x9] of 0s
    const ticketArray = Array.from({ length: 3 }, () => Array(9).fill(-1));
    // Create a list of numbers from 1 to 90.
    const totalNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
    // Create a list of tuples of all the indices of 3x9 ticketArray. i.e (0,0),(0,1),...,(2,8)
    const totalIndices = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 9; j++) {
            totalIndices.push([i, j]);
        }
    }
    // Create an empty array to store 15 random indices to fill in the value.
    const randomIndices = [];
 
    // Generate 15 random indices that satisfy RULE #1 and store them in randomIndices array.
    const firstRow = getRandomSample(totalIndices.slice(0, 9), 5);
    const secondRow = getRandomSample(totalIndices.slice(9, 18), 5);
    const thirdRow = getRandomSample(totalIndices.slice(-9), 5);
 
    randomIndices.push(...firstRow, ...secondRow, ...thirdRow);
 
    // Populate values in the randomly generated indices such that it satisfies RULE #2 and replace the value of the used value in totalNumbers array by 0.
    randomIndices.forEach((num) => {
        const [row, col] = num;
        const indexRange = getIndexRange(col);
        let number = 0;
        while(number == 0) {
            number = getRandomNumber(totalNumbers.slice(indexRange.start, indexRange.end));
        }
        ticketArray[row][col] = number;
        totalNumbers[totalNumbers.indexOf(number)] = 0;
    });
    // console.log(ticketArray);
    sortColumns(ticketArray);
    // console.log(newArr);
 
    // Sort the ticketArray column-wise to satisfy RULE #3
    // for (let col = 0; col < 9; col++) {
    //     if (ticketArray[0][col] !== 0 && ticketArray[1][col] !== 0 && ticketArray[2][col] !== 0) {
    //         for (let row = 0; row < 2; row++) {
    //             if (ticketArray[row][col] > ticketArray[row + 1][col]) {
    //                 [ticketArray[row][col], ticketArray[row + 1][col]] = [ticketArray[row + 1][col], ticketArray[row][col]];
    //             }
    //         }
    //     } else if (ticketArray[0][col] !== 0 && ticketArray[1][col] !== 0 && ticketArray[2][col] === 0) {
    //         if (ticketArray[0][col] > ticketArray[1][col]) {
    //             [ticketArray[0][col], ticketArray[1][col]] = [ticketArray[1][col], ticketArray[0][col]];
    //         }
    //     } else if (ticketArray[0][col] !== 0 && ticketArray[2][col] !== 0 && ticketArray[1][col] === 0) {
    //         if (ticketArray[0][col] > ticketArray[2][col]) {
    //             [ticketArray[0][col], ticketArray[2][col]] = [ticketArray[2][col], ticketArray[0][col]];
    //         }
    //     } else if (ticketArray[0][col] === 0 && ticketArray[1][col] !== 0 && ticketArray[2][col] !== 0) {
    //         if (ticketArray[1][col] > ticketArray[2][col]) {
    //             [ticketArray[1][col], ticketArray[2][col]] = [ticketArray[2][col], ticketArray[1][col]];
    //         }
    //     }
    // }
 
    return ticketArray;
}

const sortColumns = (arr = []) => {
   for(let i = 0; i<9; i++) {
       for(let j = 0; j<3; j++) {
           for(let k = j+1; k < 3; k++) {
               if(arr[j][i] != -1 && arr[k][i] != -1 && arr[j][i]>arr[k][i]) {
                   let x = arr[j][i];
                   arr[j][i] = arr[k][i];
                   arr[k][i] = x;
               }
           }
       }
   }
};
 
function getRandomSample(array, count) {
    return array.sort(() => Math.random() - 0.5).slice(0, count);
}
 
function getRandomNumber(array) {
    return array[Math.floor(Math.random() * array.length)];
}
 
function getIndexRange(column) {
    const start = column * 10;
    const end = start + 10;
    return { start, end };
}

// console.log(generateTicket());

  
export { generateTicket };
