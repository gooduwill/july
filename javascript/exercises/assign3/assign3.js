function isSpecialArray(arr){
    let count=0,count1=0
    for(let i=0;i<arr.length;i++){
        if(arr[i]%2==0 && i%2==0){
            count++
            if(count==arr.length/2){
                console.log('éven position have even no')
            }
            else{return false}
        }
    }
    for(let j=0;j<arr.length;j++){
        if(arr[j]%2==1 && arr[j]%2==1){
            count1++
            if(count1==arr.length/2){
                console.log('odd no at odd position')
            }
            else{ return false}
        }
    }
    if(count==arr.length/2 && count1==arr.length/2){
        return true
    }
}
console.log(isSpecialArray([2,7,4,9,6,1,6,3]))
