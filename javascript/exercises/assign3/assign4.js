function numbersSum(arr){
let result=0
for(let i=0;i<arr.length;i++){
    if(typeof arr[i]=='number'){
        result=result+arr[i]
    }
}

return result

}
console.log(numbersSum([1,2,'13','4','645']))