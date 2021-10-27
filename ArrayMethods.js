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

// calculate the amount of the “check” (the function argument is an array of objects [{name: ‘Product”, amount: 3, price: 100}, ...], the function should return the total amount as a number)

function amountOfCheck (check) {
  let sum = 0;
  
  if (check.length === 0) return sum;

  check.forEach(element => {
    sum += Math.round(element.amount * element.price);
  });

  // return sum.toFixed(2);
  return sum;
};

const check = [
  {
    name: 'milk',
    amount: 3,
    price: 32, 
  },
  {
    name: 'bread',
    amount: 2,
    price: 20, 
  },
  {
    name: 'meat',
    amount: 1,
    price: 180, 
  },
];

console.log(amountOfCheck(check));

//  make an additional function that will allow you to form an object as in the previous task from an array of arrays

function makeACheck (arrayOfGoods) {
  let newCheck =[];
  
  if (arrayOfGoods.length === 0) return newCheck;  

  for (const item of arrayOfGoods) {
    const product = {
      name: item[0],
      amount: item[1],
      price: item[2], 
    };

    newCheck.push(product);
  };

  return newCheck;
};

const arrayOfGoods = [
  [
    'milk',
    3,
    32,
  ],
  [
    'bread',
    2,
    20,
  ],
  [
    'meat',
    1,
    180,
  ],
];

console.log(makeACheck(arrayOfGoods));

// filter the object by fields that include the letter "a" in the name (the function takes an object

function filterTheObject (currentObject) {
  const keys = Object.keys(currentObject);
  const newObject = {};
  const filterKeys = keys.filter(key => key.includes('a'));

  for (const item of filterKeys) {
    newObject[item] = currentObject[item];
  };

  return newObject;
};

const currentObject = {
  a: 'asd',
  asd: [1,2,3],
  bret: 'qwe',
  bta: 123,
};

console.log(filterTheObject(currentObject));
