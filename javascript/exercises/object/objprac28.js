function freeShipping(obj) {
    let sum=0
    for(let key in obj){
        sum=sum+obj[key]
        if(sum>50){
            return true
        }
        else{
            return false
        }
    }
}

console.log(freeShipping({ "Shampoo": 5.99, "Rubber Ducks": 15.99 })) // false
console.log(freeShipping({ "Flatscreen TV": 399.99 })) // true

