arr=[1,2,3]
const result=arr.reduce((acc,cv)=>{
return (acc+cv*cv)
},0)
console.log(result)