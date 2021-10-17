# BFE.dev_questions

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

