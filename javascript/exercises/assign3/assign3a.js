function isSpecialArray(arr){
    let fact=true
    for(let i=0;i<arr.length ;i++){
        const result=(i%2==0)?arr[i]%2==0:arr[i]%2==1
        fact=fact&&result
    }
    return fact
}
console.log(isSpecialArray([2,7,4,9,6,1,6,3]))
console.log(isSpecialArray([2,7,4,10,6,1,6,3]))