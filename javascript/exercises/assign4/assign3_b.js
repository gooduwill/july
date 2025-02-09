function totalVolume(arr){
let result=1,sum=0
for(let i=0; i<arr.length;i++){
    for(let j=0;j<3;j++){
        result=result*arr[i][j]
    }
sum=sum+result}
return sum
}

console.log(totalVolume([[2,2,2],[2,1,1]]))
console.log(totalVolume([[2,2,2],[2,1,1],[3,1,1]]))

