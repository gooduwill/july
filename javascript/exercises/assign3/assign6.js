function removeDups(arr){
    const unique=[]
    for(let i=0;i<arr.length;i++){
        if(!(unique.includes(arr[i])))
        {
            unique.push(arr[i])
        }

    }
    return unique
}
console.log(removeDups([1,0,1,0]))