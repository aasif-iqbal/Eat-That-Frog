Geek4Geeks
DSA 
+logic building
- https://www.geeksforgeeks.org/dsa/logic-building-problems/

+ Array (Start with here)
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

## Array rotation.
https://www.geeksforgeeks.org/dsa/complete-guide-on-array-rotations/

let arr = [1,2,3,4,5];

function rotateClockwise(arr, d){
  
  let n=arr.length;
  if(d > n) return null;
  
  let k = [];
  let final = [];
  
  for(let i=0; i < d; i++){
    k.push(arr[i]);
  }
  
  for(let j=d; j < n; j++){
    final.push(arr[j])
  }
  
  
  return final.concat(k);
}

let result = rotateClockwise(arr,3);

console.log(result);

### Juggling Algorith (for array rotation) Time complexity:O(n) and Space complexity:O(1)
function gcd(a, b) {
    while (b !== 0) {
        let temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

function jugglingRotate(arr, d) {
    let n = arr.length;
    // Normalize d to handle cases where d > n
    d = d % n;
    // Find number of sets
    let sets = gcd(n, d);
    
    // Process each set
    for (let i = 0; i < sets; i++) {
        // Start from index i
        let temp = arr[i]; // Save first element of the cycle
        let j = i;         // Current index
        while (true) {
            // Compute next index for left rotation
            let k = (j - d + n) % n;
            // If we return to the starting index, break
            if (k === i) break;
            // Move element from k to j
            arr[j] = arr[k];
            j = k; // Move to next index in cycle
        }
        // Place the saved element in its final position
        arr[j] = temp;
    }
    return arr;
}

// Example usage
let arr = [1, 2, 3, 4, 5];
console.log(jugglingRotate(arr, 2));
// Output: [3, 4, 5, 1, 2]

Time: 23:00
https://www.youtube.com/watch?v=H8Zp_nCw51U


https://www.youtube.com/watch?v=j_gowhvl3yY

## Fibonacci series
The Formula 
F: n = Fn-1 + Fn-2
Where:
F: n represents the nth term in the sequence.
F: n-1 represents the term before the nth term.
F: n-2 represents the term two positions before the nth term.
Initial Values The sequence starts with F₀ = 0 and The next term is F₁ = 1. 
Generating the Sequence 
F: ₀ = 0
F: ₁ = 1
F: ₂ = F₁ + F₀ = 1 + 0 = 1
F: ₃ = F₂ + F₁ = 1 + 1 = 2
F: ₄ = F₃ + F₂ = 2 + 1 = 3
F: ₅ = F₄ + F₃ = 3 + 2 = 5

function fibonaci(n){

  let fibArr = [0,1];

  for(let i=2; i< n; i++){
    fibArr.push((i-1)+(i-2));
  }  
  return fibArr;
}

let n = 5; // num of terms
console.log(fibonaci(n))

- String
- Recursion

let arr = [1,3,4,5,6,7,8]; // [4,5,6,7,8,1,3]

function rotateArr(arr, d){
  
  if(arr.length == 0) return null;
  if(d > arr.length) return null;
  if(d === arr.length) return arr;
  
  let temp = [];
  
  for(let i=d; i < arr.length; i++){
    temp.push(arr[i]);
  }
  
  for(let i=0; i < d; i++){
    temp.push(arr[i]);
  }
  return temp;
}
console.log(rotateArr(arr, 21));

function rotateArrNoExSpace(arr, d){
  
  let len = arr.length;
  let temp = arr[0];
  
  for(let i=0; i<len; i++){
    arr[i] = arr[i+1];
  }
  
  arr[len-1] = temp;
  
  return arr;
}

// console.log(rotateArrNoExSpace(arr,1))
