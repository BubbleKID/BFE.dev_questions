### Leetcode总进度:
#### Easy: 7/527
#### Medium 8/1107
#### Hard 0/442
15. 3sum
    two pointer
    https://www.youtube.com/watch?v=Tx86Jr-4_lg
16. Remove Duplicates from Sorted Array
    Time complextiy : O(n)O(n). 
    Space complexity : O(1)O(1).
    ```
        var removeDuplicates = function(nums) {
        let n = nums.length;
        if(n === 0) {
            return 0;
        }
        let insertIndex = 1;
        for(let i = 1; i< n; i++) {
            if(nums[i] != nums[i-1]) {
                nums[insertIndex] = nums[i]
                insertIndex++;
            }
        }
        
        return insertIndex
    ```
};

341. Flatten Nested List Iterator
```
class NestedIterator {
  constructor(nestedList) {
    this.gen = this.listGenerator(nestedList);
    this.nextVal = this.gen.next();
  }

  hasNext() {
    return !this.nextVal.done;
  }

  next() {
    const val = this.nextVal.value;
    this.nextVal = this.gen.next();
    return val;
  }

  // declare an iterator
  *listGenerator(list) {
    for (const el of list) {
      if (el.isInteger()) yield el.getInteger();
      else yield* this.listGenerator(el.getList());
    }
  }
}
```

347. Top K Frequent Elements
```
var topKFrequent = function(nums, k) {
   let rank = {};
    let sortedArr = {};
    nums.forEach(num => {
        if(rank[num] === undefined) {
            rank[num] = 1;
        } else {
            rank[num] +=1;
        }
    });
    
    sortedArr = Object.entries(rank).sort(([,a],[,b]) => b-a);
    return sortedArr.map(arr => parseInt(arr[0])).splice(0, k);
    
};
```

361. Hamming Distance
Number.toString(2) 转换2进制
unshift 数组往前补0
array.unshift('0')15. 3sumhttps://www.youtube.com/watch?v=Tx86Jr-4_lg
```
var hammingDistance = function(x, y) {
    
    var xBase = x.toString(2).split("");
    var yBase = y.toString(2).split("");
    var distance = 0;
    while(xBase.length < yBase.length){
        xBase.unshift("0");
    }
    while(xBase.length > yBase.length){
        yBase.unshift("0");
    }
    
    xBase.forEach((x,i)=>{
        if(x !== yBase[i]){
            distance++
        }
    })
    return distance;
};
```
9. Palindrome Number
```
var isPalindrome = function(x) {
    let max = Math.pow(2, 31) - 1;
    let min = -max - 1;
    let reverseX = parseInt(x.toString().split('').reverse().join(''));
    
    if(x > max || x < min || x < 0) return false;
    
    return reverseX === x;
};
```