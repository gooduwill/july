const product={}
product.id=1
product.name='marker'
product.rating=3
console.log(product)

const fruits=['mango','orange','kiwi']
for(let i=0;i<fruits.length;i=i+2){
    console.log(fruits[i])

}

product['expiry']='july'
product.rating=7
product['rating']=10
console.log(product)
for(let key in product){
    let value=product[key]
    console.log(key,value)
}
delete product.rating
console.log(product)
const check='rating'in product
if(check){
    console.log('key exist')
}
else {console.log("key does not exist")}
let count=0
for(let key in product){
    count++
}
console.log('no of keys',count)




