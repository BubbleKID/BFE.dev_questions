# BFE.dev_questions

### 1. Currying is a useful technique used in JavaScript applications.

Please implement a curry() function, which accepts a function and return a curried one.

Here is an example
```
const join = (a, b, c) => {
   return `${a}_${b}_${c}`
}

const curriedJoin = curry(join)

curriedJoin(1, 2, 3) // '1_2_3'

curriedJoin(1)(2, 3) // '1_2_3'

curriedJoin(1, 2)(3) // '1_2_3'
```
more to read

https://javascript.info/currying-partials

https://lodash.com/docs/4.17.15#curry

Answer
Arrow function expressions doenst support `arguments`, but can be restructured this way:
((...arguments) => console.log(arguments))(1, 2, 3);

```
const curry= (fn) => {
  return curried = (...args) => {
    // The length property indicates the number of parameters expected by the function.
    if (args.length >= fn.length) {
      // The apply() method calls a function with a given this value, and arguments provided as an array (or an array-like object). but call takes arguments provided individually.
      return fn.apply(this, args);
    } else {
      return (...args2) => {
        // conbine arrays
        return curried.apply(this, args.concat(args2));
      }
    }
  }
}
```
If passed args count is the same or more than the original function has in its definition (func.length) , then just pass the call to it using func.apply.
Otherwise, get a partial: we don’t call func just yet. Instead, another wrapper is returned, that will re-apply curried providing previous arguments together with the new ones.

### 11. what is Composition? create a pipe()
what is Composition? It is actually not that difficult to understand, see @dan_abramov 's explanation.

Here you are asked to create a pipe() function, which chains multiple functions together to create a new function.

Suppose we have some simple functions like this
```
const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y
```
Your pipe() would be used to generate new functions

```
pipe([
  times(2),
  times(3)
])  
// x * 2 * 3

pipe([
  times(2),
  plus(3),
  times(4)
]) 
// (x * 2 + 3) * 4

pipe([
  times(2),
  subtract(3),
  divide(4)
]) 
// (x * 2 - 3) / 4
```
notes

to make things simple, functions passed to pipe() will all accept 1 argument

Answer
```
const times = (y) =>  (x) => x * y
const plus = (y) => (x) => x + y
const subtract = (y) =>  (x) => x - y
const divide = (y) => (x) => x / y

// return a function that take x as parameter
const pipe = (funcs) => (x) => funcs.reduce((y, func) => func(y), x); 
// result as accumulator, func as reducer
// x as accumulator's initialValue value

pipe([
  times(2),
  subtract(3),
  divide(4)
])(2)

// return 0.25
```

https://www.youtube.com/watch?v=t-kRkZrFdfg

### 47. reverse a linked list
Another basic algorithm even for Front End developers.

You are asked to reverse a linked list.

Suppose we have Node interface like this
```
class Node {
   new(val: number, next: Node);
   val: number
   next: Node
}
```
We can then chain nodes together to create a linked list.
```
const Three = new Node(3, null)
const Two = new Node(2, Three)
const One = new Node(1, Two)

//now we have  a linked list
// 1 → 2 → 3
```
Now how can you reverse it to 3 → 2 → 1 ? you can modify the next property of each node, but not the val.

Follow up

Could you solve it with and *without recursion*?

Answer
```
const reverseLinkedList = (list) => {
  // set nextNode and prevNode then we can set previous node of first node 
  // and nextNode of last node to null
  let nextNode = null;
  let prevNode = null;
  // if list !== null
  while(list) {
    // if it takes One as list, set Two as next node
    nextNode = list.next;
    // after reverse, One is the last node so, prevNode is null
    list.next = prevNode;
    // prevNode of Two now is One
    prevNode = list;
    // set nextNode = Two
    list = nextNode;
  }
  return list;
}
```
### 148. create a counter object
Create an object with property `count`, which increments every time count is accessed, initial value is 0.
```
const counter = createCounter()
counter.count // 0, then it should increment
counter.count // 1
counter.count // 2
counter.count = 100 // it cannot be altered
counter.count // 3
```
Answer
```
function createCounter() {
  let counter = -1;
  // Javscript setter and getter
  // https://www.w3schools.com/js/js_object_accessors.asp
  return {
    get count() {
      counter += 1;
      return counter;
    }
  }
}

// or https://www.youtube.com/watch?v=ilEN1KXFcYg
function createCounter(): {count: number } {
 
  let count = 0

  const obj = {
    count: 0
  }

  Object.defineProperty(obj, 'count', {
    get: function() {
      return count++
    }
  })

  return obj
}
```
### 154. Two-way binding
Let's do some simple two-way binding.

Please create a function `model(state, element)`, to bind state.value to the HTMLInputElement `element`.
```
const input = document.createElement('input')
const state = { value: 'BFE' }
model(state, input)

console.log(input.value) // 'BFE'
state.value = 'dev'
console.log(input.value) // 'dev'
input.value = 'BFE.dev'
input.dispatchEvent(new Event('change'))
console.log(state.value) // 'BFE.dev'
```
Answer
Use Object.defineProperty to override the value property of state
理解Object.defineProperty的作用
https://segmentfault.com/a/1190000007434923
```
function model(state, element) {
  element.value = state.value;
  element.addEventListener("change", function() {
    state.value = element.value;
  });
  Object.defineProperty(state, 'value',{
      get: () => element.value,
      set: (value) => element.value = value
  });
}
```

### 155. create a count function
Please create a function `count()` , when called it should return how many times it has been called, `count.reset()` should also implemented.

```
count() // 1
count() // 2
count() // 3

count.reset()

count() // 1
count() // 2
count() // 3
```
Answer

```
// IIFE (Immediately Invoked Function Expression) (function () { statements })(); 
// It allows function runs as soon as it is defined. 
const count = (() => {
  let num = 0;
  // Closure:, a closure gives you access to an outer function’s scope from an inner function
  // In this case func can access variable num
  const func = () => ++num;
  func.reset = () => num = 0;
  return func;
})();
```
The num variable only exist in the outer and inner functions. The outer function never had its reference stored to a variable because it was immediately called, so it never will be called again. The inner function reference was stored in func and can be called again.
https://stackoverflow.com/questions/65273130/variables-in-a-iife

### 159. implement promisify()
Let's take a look at following error-first callback.
```
const callback = (error, data) => {
  if (error) {
    // handle the error
  } else {
    // handle the data
  }
}
```
Now think about async functions that takes above error-first callback as last argument.
```
const func = (arg1, arg2, callback) => {
  // some async logic
  if (hasError) {
    callback(someError)
  } else {
    callback(null, someData)
  }
}
```
You see what needs to be done now. Please implement promisify() to make the code better.
```
const promisedFunc = promisify(func)

promisedFunc().then((data) => {
  // handles data
}).catch((error) => {
  // handles error
})
```
Anwser
https://www.youtube.com/watch?v=WLoOTzTRfpg&feature=emb_imp_woyt
Arrow functions do not bind their own this , instead, they inherit the one from the parent scope, which is called "lexical scoping"
```
function promisify(func) {   
  // return (...args) => { 
  // use function instead arrow funcion to pass this
  return function(...args){
    return new Promise((resolve, reject) => {
      func.call(this, ...args, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
```

### 162. find the single integer
Given an array of integers, all integers appear twice except one integer, could you quickly target it ?
```
const arr = [10, 2, 2 , 1, 0, 0, 10]
findSingle(arr) // 1
```
What is time & space cost of your approach ? Could you do better ?
Answer

```
// noob
function findSingle(arr) {
  let compareArr = []
  arr.filter(num => {
    if(compareArr.includes(num)) {
      compareArr.splice(compareArr.indexOf(num), 1);
    } else {
      compareArr.push(num)
    }
  });
  return compareArr[0];
}
```
```
// pro
function findSingle(arr: number[]): number {
  // your code here
  let res = 0
  arr.forEach( num => res ^= num )
  return res
}
// or

function findSingle(arr: number[]): number {
  // your code here
  return arr.reduce((acc, cur) => acc ^= cur, 0)
}

```
0^10^2^2^1^0^0^10
The bitwise XOR operator (^) returns a 1 in each bit position for which the corresponding bits of either but not both operands are 1s.
num XOR itself = 0

### 163. integer to roman numerals
Roman numerals are represented by combinations of following seven symbols, each with a fixed integer value.

Symbol	I	V	X	L	C	D	M
Value	1	5	10	50	100	500	1000
For Standard form, subtractive notation is used, meaning 4 is IV rather than IIII, 9 is IX rather than VIIII. Same rule applies to 40(XL) and 900(CM) .etc.

Simply speaking, the roman numerals in standard form follow these rules.

symbols are listed from highest to lowest, from left to right
from left to right, if the next symbol value is bigger than current one, it means subtracting, otherwise adding.
Please implement integerToRoman(). The input are all integers within valid range.

```
integerToRoman(123)
// 'CXXIII'

integerToRoman(1999)
// 'MCMXCIX'

integerToRoman(3420)
// 'MMMCDXX'
```
Answer
【JavaScript】JS中如何跳出循环/结束遍历
https://segmentfault.com/a/1190000020176190
```
function romanToInteger(num) {
    const symbols = [
    { value: 1000, roman: 'M' },
    { value: 900, roman: 'CM' },
    { value: 500, roman: 'D' },
    { value: 400, roman: 'CD' },
    { value: 100, roman: 'C' },
    { value: 90, roman: 'XC' },
    { value: 50, roman: 'L' },
    { value: 40, roman: 'XL' },
    { value: 10, roman: 'X' },
    { value: 9, roman: 'IX' },
    { value: 5, roman: 'V' },
    { value: 4, roman: 'IV' },
    { value: 1, roman: 'I' }
  ];
  let roman = '';
  while(num > 0) {
    let loop = true;
    symbols.forEach(symbol => {
      if(num >= symbol.value && loop) {
        num -= symbol.value;
        roman += symbol.roman;
        loop = false;
      }
    });
  }
  return roman;
}
```