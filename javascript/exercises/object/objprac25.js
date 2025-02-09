function getBudgets(arr){
let result=0
arr.forEach((ele)=>{
result=result+ele.budget

})
return result
}

console.log(getBudgets([
    { name: "John", age: 21, budget: 23000 },
    { name: "Steve",  age: 32, budget: 40000 },
    { name: "Martin",  age: 16, budget: 2700 }
  ])) // 65700