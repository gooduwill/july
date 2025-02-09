function matchLastItem(arr){
    let result=''
    let result1=arr[arr.length-1]
    let count=0
    for(let i=0;i<arr.length-1;i++){
        result=result+arr[i]
    }

    if(result==result1){
        return true
    }
    else{
        return false
    }
    }
console.log(matchLastItem(['rsq','6hi','g','rsq6hig']))