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
};

const a = new CustomArray(1, 2, 3);
const b = new CustomArray(1, 2, 3, 4);

console.log(a.arr);
console.log(b.arr);

a.push(3, 4, 5);
console.log(a.arr);

console.log(b.pop());
console.log(b.arr);
