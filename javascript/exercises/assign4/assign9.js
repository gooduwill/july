function allTruthy(arr){

    let falsy1=[false,0,null,undefined],count=0

        for(let j=0;j<arr.length;j++){
            if(falsy1.includes(arr[j])){
    
                return false
                
            }
            else{ count++
                if(count==arr.length)
                {return true}
            }
        }
    }

console.log(allTruthy([true,true,true,false]))
console.log(allTruthy([true,true,true]))