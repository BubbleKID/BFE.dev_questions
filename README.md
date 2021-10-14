# BFE.dev_questions
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
// allow function runs as soon as it is defined. 
const count = (() => {
  let num = 0;
  const func = () => ++num;
  func.reset = () => num = 0;
  return func;
})();
```
 


