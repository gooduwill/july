function uniqueChara(arr){
    let result=[ ]
    for(let i=0;i<arr.length;i++){
        if(!result.includes(arr[i])){
            result=result+arr[i]}
    }
 return result}

 array=['cat', 'cat', 'dog', 'dog', 'tiger']
 console.log(uniqueChara(array))