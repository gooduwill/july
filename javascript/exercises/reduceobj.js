 const cartItems = [
    { name: "Laptop", quantity: 1, price: 100000 },
    { name: "Smartphone", quantity: 2, price: 50000 },
    { name: "Headphones", quantity: 3, price: 4000 }
  ];
  const total=cartItems.reduce(function(acc,cv){
 const subtotal=cv.quantity*cv.price
 return acc+subtotal

  },0)
  console.log(total)

  