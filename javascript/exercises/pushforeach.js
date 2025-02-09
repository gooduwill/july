const numbers=[10,'one',11,'two']
const result=[]
numbers.forEach((ele)=>{
  if(typeof ele=='string'){
     result.push(ele)
  }
})
console.log(result)