function sumAscii(arr){

    const result=arr.reduce(function(acc,cv){
     return acc+(cv.charCodeAt())
     
    },0)
    return result
}
console.log(sumAscii(['a','b','c']))