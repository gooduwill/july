const fruits=['mango', 'orange', 'kiwi']
fruits.forEach(function(ele){
    console.log(ele)
})
const result2=[]
const numbers=[10,'one',11,'two','three',12]
numbers.forEach(function(ele){
if(typeof ele=='string'){
    result2.push(ele)
}
})
console.log(result2)
