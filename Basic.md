Open your fav code editor and start
[Programiz](https://www.programiz.com/javascript/online-compiler/)

# Reverse given array
```js
const arr = [1,2,3,4,5,6]
```
```js
function rev(arr){
    let new_arr = []
    for(let i = arr.length-1; i >= 0; i--){
        new_arr.push(arr[i])
    }
    return new_arr;
}

console.log('Result', rev(arr));
```

# Remove Duplicate from an array
```js
const arr = [1,3,2,3,3,4,5,6,6,7,9];
```

***Bruat-Froce method***

```js
let uniqueArr = []
let newArr = arr.sort();
for(let i=0; i < newArr.length; i++){
    if(newArr[i] !== newArr[i+1]){
        uniqueArr.push(newArr[i])
    }
}
console.log(uniqueArr)
```
A: using Set
```js
const uniqueArr = [...new Set(arr)];
```
B: using filter
```js
const uniqueArr = arr.filter((value, index) => arr.indexOf(value) === index);
```
C: using reduce
```js
const uniqueArr = arr.reduce((acc, value) => {
    if(!acc.includes(value)) acc.push(value);
    return acc;
}, [])
```
D. using forEach
```js
const uniqueArr = []
const seen = {}
arr.forEach(value => {
    if(!seen[value]){
        seen[value] = true;
        uniqueArr.push(value);
    }
});
```

# Find missing number in array
```js
let arr = [1,3,2,5,4,8,6]; // Missing number:7

function findMissing(arr){
   let total = 0;
   let arr_total = 0;
   
   for(let i=0; i < arr.length; i++){
       arr_total += arr[i];
   }
   
   let newArr = arr.sort();
   let last_elem = newArr.slice(-1)
   
   for(let i=1; i <= last_elem; i++){    
       total += i
   }
   return (total - arr_total)
}
console.log(findMissing(arr));
```
# Find Intersection of two arrays

```js
// Online Javascript Editor for free
// Write, Edit and Run your Javascript code using JS Online Compiler

const arr1 = [1,3,4,5,6]
const arr2 = [9,8,5,6]
// output: [5,6]

//Loop through each array and compare elem of arr1 with arr2
// if match push it to new array and return new array

function intersectionArr(arr1, arr2){
    let output = []
    
    for(let i=0; i < arr1.length; i++){
        for(let j=0; j < arr2.length; j++){
            if(arr1[i] === arr2[j]){
                output.push(arr2[j]);
            }
        }    
    }
    return output;
}
console.log(intersectionArr(arr1, arr2))
```
# Count each elem in array
```js
let arr = [0,2,1,1,1,1,1,0,0,0,2,2,2,2,1,1,1]
//count number of 0's,1's and 2's

//loop each elem, 
//create counter for each elem

function countElem(arr){
    let counter_zero = 0;
    let counter_one = 0;
    let counter_two = 0;
    
    for(let i=0; i < arr.length; i++){
                    
        if(arr[i] === 0){
            counter_zero++;
        }                  
        if(arr[i] === 1){
            counter_one++;
        }
        if(arr[i] === 2){
            counter_two++;
        }                
    }
    return {
            "zero":counter_zero,
            "one":counter_one,
            "two":counter_two,
        }
}

console.log(countElem(arr))
```

# Count Each letters in array of strings
```js
const str = ['apple', 'banana', 'kiwi', 'jackfruit', 'mango'];

function countElem(str){
    let map = new Map()
    
    for(let i=0; i< str.length; i++){
        // console.log(str[i]);
        // console.log(str[i].split('').length);

        map.set(str[i], str[i].split('').length)
    }
    return map
}

console.log(countElem(str))

Output : Map(5) {
  'apple' => 5,
  'banana' => 6,
  'kiwi' => 4,
  'jackfruit' => 9,
  'mango' => 5
}
```
# Merge two array and remove duplicate elem
```js
    const users1 = [
       { userId: 1, name: 'Alice', email: 'alice@example.com' },
       { userId: 2, name: 'Bob', email: 'bob@example.com' }
     ];
     const users2 = [
       { userId: 2, name: 'Bobby', email: 'bobby@example.com' },
       { userId: 3, name: 'Charlie', email: 'charlie@example.com' }
     ];

function mergeTwoArr(users1, users2){
    let combinedArr = [...users1, ...users2];
    
    let uniqueUserMap = new Map();
    combinedArr.map((user) => {
        if(!uniqueUserMap.has(user.userId)){
            uniqueUserMap.set(user.userId, user)
        }
    })
    // console.log(uniqueUserMap);
    // Now convert the map values into array
    const result  = Array.from(uniqueUserMap.values())
    return result;
}
console.log(mergeTwoArr(users1, users2))
Output:
[
  { userId: 1, name: 'Alice', email: 'alice@example.com' },
  { userId: 2, name: 'Bob', email: 'bob@example.com' },
  { userId: 3, name: 'Charlie', email: 'charlie@example.com' }
]
```

# Anagram
```js
function anagram(str1, str2){
  
  let v_1 = str1.toLowerCase().split("");  
  let v_2 = str2.toLowerCase().split("");
  
  let v1 = v_1.filter(char => char !== ' ');
  let v2 = v_2.filter(char => char !== ' ');
  
  
  let l1 = v1.length;
  let l2 = v2.length;
  
  if(l1 != l2) return false;

  for(let i = 0; i < l1; i++){
  	
  	for(let j = 0; j < l2; i++){
  		
  		if(v1[i] === v2[j]){
  			return true;
  		}
  	}
  }
  return false;
}

console.log(anagram('Debit Card','Bad Credit'));
```