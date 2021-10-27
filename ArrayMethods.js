'use strict';

// find the arithmetic mean of all odd array elements in even places (at least 2 different solutions)

function findAverage1(arr) {
    if (arr.length === 0) return 0;
    
    let numberOfElements = 0;
    let sum = 0;
  
    for (let i = 0; i < arr.length; i += 2) {
      if (arr[i] % 2 === 1) {
        sum += arr[i];
        numberOfElements++;
      };
    };
  
    if (numberOfElements > 0) {
      return sum / numberOfElements;
    }
  
    return 0;
  };
  
  function findAverage2(arr) {
    if (arr.length === 0) return 0;
  
    const filterArr = arr.filter((i, index) => ((i % 2) === 1) && (index % 2 === 0));
  
    return filterArr.reduce((start, number) => start + number, 0) / filterArr.length;
  }

const arr = [5, 7, 10, 1, 1, 11, 11, 11];

console.log(findAverage1(arr));
console.log(findAverage2(arr));
