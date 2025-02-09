function capMe(arr){
    let result
    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            console.log(arr[j].length)
            if(j==0){
                result=result+arr[j].toUpperCase()
            }
                else{ result=result+arr[j].toLowerCase()

                }
        }
    }
    return result
}
console.log(capMe(["mavis","senaide","letty"]))