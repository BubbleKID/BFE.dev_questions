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