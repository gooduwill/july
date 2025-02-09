function expensiveOrders(orders, cost){
const result={}
for(let key in orders){
    if(orders[key]>cost){
        result[key]=orders[key]
    }
}
return result
}

console.log(expensiveOrders({ "a": 3000, "b": 200, "c": 1050 }, 1000)) // { "a": 3000, "c": 1050 }
console.log(expensiveOrders({ "Deluxe Burger": 35, "Icecream Shake": 4, "Fries": 5 }, 40)) // {}