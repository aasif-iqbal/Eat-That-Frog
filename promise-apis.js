// Promise.all and Promise.allSettled
const task1 = () => {
  let status = true;
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if(status){
        resolve('Done - task 1');
      }else{
        reject('Failed to do task 1');
      }
    })
  })
}

const task2 = () => {
  let status = true;
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if(status){
        resolve('Done - task 2');
      }else{
        reject('Failed to do task 2');
      }
    })
  })
}

const task3 = () => {
  let status = false;
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      if(status){
        resolve('Done - task 3');
      }else{
        reject('Failed to do task 3');
      }
    })
  })
}

Promise.all([task1(), task2(), task3()]).then((result)=>{
  console.log(result);
}).catch((err)=>{
  console.log(err);
})

// Promise.allSettled([task1(), task2(), task3()]).then((result)=>{    
//   console.log(result);
// }).catch((err)=>{
//   console.log(err);
// });  

// Promise.any and Promise.race
