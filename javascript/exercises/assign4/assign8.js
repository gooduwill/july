function progressDays(arr){
    let count=0
    for(let i=0;i<arr.length-1;i++){
        if(arr[i+1]>arr[i]){
            count++
        }
    }
    return count
}
console.log(progressDays([3,4,1,2]))