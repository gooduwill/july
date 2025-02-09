function missingNum(arr){

    const arr2=[1,2,3,4,5,6,7,8,9,10]
    let result
    for(let i=0; i<arr2.length;i++){
        if(!(arr.includes(arr2[i]))){
            result=arr2[i]
                    }
    }
    return result
}
 console.log(missingNum([1,2,3,4,6,7,8,9,10]))