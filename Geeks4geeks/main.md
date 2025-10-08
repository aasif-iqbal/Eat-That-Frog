Geek4Geeks
DSA 
+logic building
- https://www.geeksforgeeks.org/dsa/logic-building-problems/

+ Array
- https://www.geeksforgeeks.org/dsa/array-data-structure-guide/

## Basic Problem
https://www.geeksforgeeks.org/dsa/leaders-in-an-array/
1. Function to find the leaders in an array
function leaders(arr) {
    const result = [];
    const n = arr.length;
    
    for (let i = 0; i < n; i++) {
        let j;
        // Check elements to the right
        for (j = i + 1; j < n; j++) {
            // If a larger element is found
            if (arr[i] < arr[j])
                break;
        }
        
        // If no larger element was found
        if (j === n)
            result.push(arr[i]);
    }
    
    return result;
}

const arr = [16, 17, 4, 3, 5, 2];
const result = leaders(arr);

console.log(result.join(" "));

## Array Methods(push, pop, concat, splice...)
- https://www.geeksforgeeks.org/javascript/javascript-arrays/

https://www.geeksforgeeks.org/dsa/program-check-array-sorted-not-iterative-recursive/


https://www.geeksforgeeks.org/dsa/remove-duplicates-sorted-array/


- String
- Recursion
