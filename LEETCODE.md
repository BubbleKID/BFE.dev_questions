26. Remove Duplicates from Sorted Array
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