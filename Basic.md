Open your fav code editor and start
[Programiz](https://www.programiz.com/javascript/online-compiler/)

# Reverse given array


# Remove Duplicate from an array
```js
const arr = [1,3,2,3,3,4,5,6,6,7,9];
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