function sumNums(arr){
    let arr2=arr.sort(function(a,b){return b-a})
    console.log(arr2)
    let result=0
     for(let i=0;i<arr2.length;i++){
        console.log(arr2[i])
        if((i==arr2.length-1) || (i== arr2.length-2)){
            result=result+arr2[i]
        }
     }
     return result
}
console.log(sumNums([19,5,42,2,77]))