function doSumOperation(display,a,b){
  const result = Math.floor(a+b);
  display(result);
}

function doSubOperation(display,a,b){
  if(a<b) return false;
  const result = Math.floor(a-b);
  display(result);
}

function display(result){
  console.log(result);
}

doSumOperation(display, 10, 30);
doSubOperation(display, 40,50);


let taskPromiseObj = new Promise((resolve, reject)=>{
  
  let status = true;
  
  setTimeout(()=>{
    if(status){
      resolve('Task done successfully');
    }else{
      reject('Failed to do task');
    }
  }, 1000);

});

// taskPromiseObj.then((result)=>{
//   console.log(result);
// }).catch((err)=>{
//   console.log(err);
// });

// Promise chaining

Promise.resolve((1))
  .then((result)=>{
    console.log(result); // 1
    return result+1;
  }).then((result)=>{
    console.log(result); // 2
    return result+1;
  }).then((result)=>{
    console.log(result); // 3
    return 'Done';
  })
  .catch((err)=>{
    console.log(err);
  });

  