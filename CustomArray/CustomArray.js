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
      this.arr[i] = item[index++];
    }

    return this.arr.length;
  }

  pop() {
    if (this.arr.length === 0) {
      return undefined;
    }

    const lastItem = this.arr[this.arr.length - 1];

    this.arr.length -= 1;

    return lastItem;
  }

  forEach(callback, thisArg) {
    const stop = this.arr.length;

    let context = this.arr;

    if(typeof callback !== 'function') {
      return undefined;
    }

    if (thisArg) {
      context = thisArg;
    }

    for (let i = 0; i < stop; i++) {
      callback.call(context, this.arr[i], i, this.arr);     
    }

    return undefined;
  }

  map(callback) {
    const result = [];

    if(typeof callback !== 'function') {
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

    if(typeof callback !== 'function') {
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
    if(typeof callback !== 'function') {
      return undefined;
    }

    for (let i = 0; i < this.arr.length; i++) {
      if(callback(this.arr[i], i, this.arr)) {
        return this.arr[i];
      }
    }
  }

  some(callback) {
    if(typeof callback !== 'function') {
      return undefined;
    }

    for(let i = 0; i < this.arr.length; i++) {
      if(callback(this.arr[i], i, this.arr)) {
        return true;
      }
    }

    return false;
  }

  every(callback) {
    if(typeof callback !== 'function') {
      return undefined;
    }

    for(let i = 0; i < this.arr.length; i++) {
      if(!callback(this.arr[i], i, this.arr)) {
        return false;
      }
    }

    return true;
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

const someA = a.some(item => item === 1);
console.log(someA);

const everyB = b.every(item => item > 2);
console.log(everyB);
