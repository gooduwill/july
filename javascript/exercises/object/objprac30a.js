function expensiveOrders(orders, cost){
    return Object.fromEntries(Object.entries(orders).filter(([key,value])=> value>cost))
    }
    
    console.log(expensiveOrders({ "a": 3000, "b": 200, "c": 1050 }, 1000)) // { "a": 3000, "c": 1050 }
    console.log(expensiveOrders({ "Deluxe Burger": 35, "Icecream Shake": 4, "Fries": 5 }, 40)) // {}