const numbers=[10,11,12,13]
for(let i=0; i<numbers.length; i++){
    console.log(numbers[i])
} console.log(numbers)

let result=[]
numbers.forEach((ele)=>{
 result=result+ele
 console.log(ele)
})
console.log(result)
const result1=numbers.filter(ele=> ele%2!=0)
console.log(result1)
const result3=numbers.map((ele)=>{
return ele+2
})
console.log(result3)

const result4=numbers.reduce((acc,cv)=>{
return acc+cv
},0)
console.log(result4)
