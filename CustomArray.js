'use strict';

class CustomArray {
  constructor(...arr) {
    this.arr = arr;
  }

  push(...item) {
    const len = item.length;
    const numbersLen = this.arr.length;
    let index = 0;

    for (let i = numbersLen; i < numbersLen + len; i++) {
      this.arr[i] = item[index];
      index++;
    }

    return this.length;
  }

  pop() {
    if (this.arr.length === 0) {
      return undefined;
    }

    const lastItem = this.arr[this.arr.length - 1];

    this.arr.length = this.arr.length - 1;

    return lastItem;
  }

  forEach(callback, thisArg) {
    const stop = this.arr.length;

    let context = this.arr;

    if(callback === undefined) {
      return undefined;
    }

    if (arguments.length > 1) {
      context = thisArg;
    }

    for (let i = 0; i < stop; i++) {
      if (this.arr[i] !== undefined) {
        callback.call(context, this.arr[i], i, this.arr);
      }
      
    }

    return undefined;
  }

  map(callback) {
    const result = [];

    if(callback === undefined) {
      return undefined;
    }

    for (let i = 0; i < this.arr.length; i++) {
      const newItem = callback(this.arr[i], i, this.arr);
      result[result.length] = newItem;
    }

    return result;
  }

  filter(callback) {
    const result = [];

    if(callback === undefined) {
      return undefined;
    }

    for (let i = 0; i < this.arr.length; i++) {
      if(callback(this.arr[i], i, this.arr)) {
        result[result.length] = this.arr[i];
      }
    }

    return result;
  }

  find(callback) {
    if(callback === undefined) {
      return undefined;
    }

    for (let i = 0; i < this.arr.length; i++) {
      if(callback(this.arr[i], i, this.arr)) {
        return this.arr[i];
      }
    }
  }
};

const a = new CustomArray(1, 2, 3);
const b = new CustomArray(1, 2, 3, 4);

console.log(a.arr);
console.log(b.arr);

a.push(3, 4, 5);
console.log(a.arr);

console.log(b.pop());
console.log(b.arr);

a.forEach(item => console.log(item));

const filterA = a.filter(item => item < 3);
console.log(filterA);

const findA = a.find(item => item > 10);
console.log(findA);

const mapB = b.map(item => item ** 2);
console.log(mapB);
