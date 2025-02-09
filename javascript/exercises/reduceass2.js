const subject=[
 {name:"Alice",marks:85},
 {name:"Bob",marks:92},
 {name:"Charlie",marks:88}

];
const result=subject.reduce((acc,cv)=>{
  return acc+(cv.marks)/3
 

},0)
console.log(result)