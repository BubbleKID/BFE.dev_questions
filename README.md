# BFE.dev_questions
### BFE总进度: 
#### Coding: 35/164
#### Design 1/14
#### Enjoy 0/68
#### TypeScript 0/43
#### CSS 0/8

### Leetcode总进度:
#### Easy: 7/527
#### Medium 8/1107
#### Hard 0/442

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
### 15. implement a simple DOM wrapper to support method chaining like jQuery
I believe you've used jQuery before, we often chain the jQuery methods together to accomplish our goals.

For example, below chained call turns button into a black button with white text.
```
$('#button')
  .css('color', '#fff')
  .css('backgroundColor', '#000')
  .css('fontWeight', 'bold')
```
The chaining makes the code simple to read, could you create a simple wrapper $ to make above code work as expected?

Answer
```
function $(el) {
  return  {
    css: function(property, value) {
      el.style[property] = value;
      return this;
    }
  }
}
```
The wrapper only needs to have css(propertyName: string, value: any)
### (Facebook)17. Create a simple store for DOM element
```
class NodeStore {
  static VALUE_KEY = '__index'
  nodeList = []
  valueList = []
   /**
   * @param {Node} node
   * @param {any} value
   */
  set(node, value) {
    node[NodeStore.VALUE_KEY] = this.nodeList.length
    this.nodeList.push(node)
    this.valueList.push(value)
  }
  /**
   * @param {Node} node
   * @return {any}
   */
  get(node) {
    if (NodeStore.VALUE_KEY in node) {
      return this.valueList[node[NodeStore.VALUE_KEY]]
    }
    return undefined
  }
  
  /**
   * @param {Node} node
   * @return {Boolean}
   */
  has(node) {
    return NodeStore.VALUE_KEY in node
  }
}
```
https://www.youtube.com/watch?v=DAaMoriI0Xg
### 19. find corresponding node in two identical DOM tree
Use BFS for two trees
```
const findCorrespondingNode = (rootA, rootB, target) => {
   // your code here
  if (rootA === target) {
    return rootB;
  }

  const queueA = [rootA];
  const queueB = [rootB];

  while(queueA.length) {
    const currentElementA = queueA.shift();
    const currentElementB = queueB.shift();

    if (currentElementA === target) {
      return currentElementB;
    }

    queueA.push(...currentElementA.children);
    queueB.push(...currentElementB.children);    
  }
  return null;
}
```
### 23. create a sum()
https://juejin.cn/post/6865805857976745998
### 28. implement clearAllTimeout()
Anwser
```
const originSetTimeout = setTimeout;
const originClearTimeOut = clearTimeout;
window.timeoutList = [];

window.setTimeout = (func, delay, ...args) => {
  const callbackWrapper  = () => {
      func(...args);
      let index = window.timeoutList.indexOf(id);  
      window.timeoutList.splice(index, 1);         
  }
  const timeoutId = originSetTimeout(callbackWrapper, delay);
  window.timeoutList.push(timeoutId);
  return timeoutId;
}

function clearAllTimeout() {  
  window.timeoutList.forEach(id => {
    originClearTimeOut(id);
  });
  window.timeoutList = [];
}
```
### 37. implement Binary Search (unique)
```
function binarySearch(arr, target){
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      if (target === arr[mid]) return mid;
      if (arr[mid] < target) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
  }
  return -1;
}
```
### 39. implement range()
while or iterator
### 42. implement Insertion Sort
function insertionSort(arr) {
  for(let index = 1; index < arr.length; index++){
    const key = arr[index];
    let subIdx = index - 1;

    while(subIdx >= 0 && arr[subIdx] > key) arr[subIdx + 1] = arr[subIdx--];

    arr[subIdx + 1] = key;
  }
}
### 44. implement Selection Sort
function selectionSort(arr) {
 for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
}
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
### 54. flatten Thunk
// https://www.youtube.com/watch?v=EhyuWntGA8s
// Javascript functions returning functions with parameters
// https://stackoverflow.com/questions/27462576/javascript-functions-returning-functions-with-parameters
```
function flattenThunk(thunk) {
   // your code here
  return function(cb){
    function wrapper(err, res){
      typeof res === 'function' ? res(wrapper) : cb(err, res);
    }
    thunk(wrapper)
  }
}
```
### 89. Next Right Sibling
https://bigfrontend.dev/problem/Next-Right-Sibiling
```
function nextRightSibling(root, target) {
  if (!root) {
    return null;
  }
  const queue = [root, null];

  while(queue.length) {
    console.log(queue)
    const node = queue.shift();
    if (node === target) {
      console.log('node === target')
      debugger
      return queue.shift();
    } else if (node === null && queue.length) {
      console.log('node === null && queue.length')
      queue.push(null);
    } else {
      console.log('queue.push(...node.children)')
      queue.push(...node.children)
    }
  }
  return null;
}
const root = document.querySelector('#root');
const button = document.querySelector('#btn');
const result = root.querySelector('a[data-id="11"]')
console.log(nextRightSibling(root, button))
```
// 用BFS搜索从root遍历所有子节点, 当节点是当前节点的时候, queue.shift()获取下一个节点就是next right sibling
### 91. invert a binary tree
Destructuring assignment: https://javascript.info/destructuring-assignment
Answer:
https://www.youtube.com/watch?v=ALnHXq-VhJA
### 93. Generate Fibonacci Number with recursion
Tail Call Optimization Solution
```
  function fib(n, a = 0, b = 1){
    if (n === 0) return a;
    if (n === 1) return b;
    return fib(n - 1, b, a + b);
  }
  const t0 = performance.now();
  console.log(
    fib(1000)
  )
  const t1 = performance.now();
  console.log(t1-t0);
```
尾递归,比线性递归多一个参数,这个参数是上一次调用函数得到的结果;
所以,关键点在于,尾递归每次调用都在收集结果,避免了线性递归不收集结果只能依次展开消耗内存的坏处.
### 97
function compress(str) {
   const res = [];
  let count = 0;
  
  for (let i = 0; i < str.length; i++) {
    count++;
    if (str[i] !== str[i+1]) {
      res.push(str[i]);
      if (count > 1) res.push(count); 
      count = 0;
    }
  }
  return res.join('');
}
### 106. Find two numbers that sum up to 0
use Map
https://zhuanlan.zhihu.com/p/358378689
### 120. create `isPrime()`
Answer 
function isPrime(num) {
  // your code here
  for(let index = 2; index <= Math.sqrt(num); index++) if(num%index === 0) return false;
  return num === 1 ? false : true;
}
### 138. Intersection of two sorted arrays
https://www.youtube.com/watch?v=8NXyNMY7uuA
function intersect(arr1, arr2) {
  // your code here
  // n * m
  // O(n * m), 
  // preprocess arr2 -> Map<number, count>
  // time: O(n) + O(m), space: O(m)

  // keep shifting
  // O(n + m)
  // reverse it first, then poping
  // O(n + m), space: O(1)
  arr1.reverse()
  arr2.reverse()

  const result = []

  while (arr1.length > 0 && arr2.length > 0) {
    const top1 = arr1[arr1.length - 1]
    const top2 = arr2[arr2.length - 1]

    if (top1 === top2) {
      result.push(top1)
      arr1.pop()
      arr2.pop()
    } else if (top1 < top2) {
      arr1.pop()
    } else {
      arr2.pop()
    }
  }

  return result
}

### 141. implement btoa()
```
  const table = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'T',
    21: 'U',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
    26: 'a',
    27: 'b',
    28: 'c',
    29: 'd',
    30: 'e',
    31: 'f',
    32: 'g',
    33: 'h',
    34: 'i',
    35: 'j',
    36: 'k',
    37: 'l',
    38: 'm',
    39: 'n',
    40: 'o',
    41: 'p',
    42: 'q',
    43: 'r',
    44: 's',
    45: 't',
    46: 'u',
    47: 'v',
    48: 'w',
    49: 'x',
    50: 'y',
    51: 'z',
    52: '0',
    53: '1',
    54: '2',
    55: '3',
    56: '4',
    57: '5',
    58: '6',
    59: '7',
    60: '8',
    61: '9',
    62: '+',
    63: '/',
  }
  let binary = str.split('').map(char => {
    let newChar = char.charCodeAt(0);
    let newBinaryChar = newChar.toString(2);
    while(newBinaryChar.length < 8) {
      newBinaryChar = '0' + newBinaryChar;
    }
    return newBinaryChar;
  }).join('');
  let result = '';
  let zeroCount = 0;
  for(let i = 0; i < binary.length; i += 6) {
    newBinary = binary.substring(i, i + 6)
    while(newBinary.length < 6) {
      newBinary += '0';
      console.log(newBinary)
      zeroCount++;
    }
    result += table[parseInt(newBinary, 2)];
  }
  if(zeroCount === 2) result += "=";
  if(zeroCount === 4) result += "==";
  return console.log(result)
}


myBtoa('BFE')
// 'QkZF'

myBtoa('BFE.dev')
// 'QkZFLmRldg=='
```
### 142. lit-html 1 - tagged templates
`string 1 ${value1} string2 ${value2}`会把字符串和变量分开存储
```
  function html(string, ...values) {
    let segs = [];
    let i;
    for(i = 0; i < values.length; i++) {
      segs.push(string[i]);
      segs.push(values[i]);
    }
    segs.push(string[i]);
    return segs.join('');
  }


  // render the result from html() into the container
  function render(result, container) {
    container.innerHTML = result;
  }
```
### 147. Pick up stones
Answer
function canWinStonePicking(n) {
  return n % 3 === 1 ? 'B' : 'A';
}
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
### 133. roman numerals to integer
Roman numerals are represented by combinations of following seven symbols, each with a fixed integer value.

Symbol	I	V	X	L	C	D	M
Value	1	5	10	50	100	500	1000
For Standard form, subtractive notation is used, meaning 4 is IV rather than IIII, 9 is IX rather than VIIII. Same rule applies to 40(XL) and 900(CM) .etc.

Simply speaking, the roman numerals in standard form follow these rules.

symbols are listed from highest to lowest, from left to right
from left to right, if the next symbol value is bigger than current one, it means subtracting, otherwise adding.
Please implement romanToInteger(). The input are all valid strings.
```

romanToInteger('CXXIII')
// 123

romanToInteger('MCMXCIX')
// 1999

romanToInteger('MMMCDXX')
// 3420
```

Answer]
```
function romanToInteger(str) {
  const symbols = [
    { value: 1000, roman: 'M' },
    { value: 500, roman: 'D' },
    { value: 100, roman: 'C' },
    { value: 50, roman: 'L' },
    { value: 10, roman: 'X' },
    { value: 5, roman: 'V' },
    { value: 1, roman: 'I' }
  ];
  
  let num = 0;
  let prev = 0;
 
  str.split('').map((letter, letterIndex) => {
    symbols.forEach((symbol, index) => {
      if(letter === symbol.roman) {
        // if previous letter exists and current value > previous value then do subtraction
        if(str[letterIndex - 1] && symbol.value > prev) {
          num = num - prev * 2 + symbol.value;
        } else {
          num += symbol.value;
        }
        prev = symbol.value;
      }
    });
  });
  return num;
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