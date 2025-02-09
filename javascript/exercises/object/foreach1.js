const numbers=[10,15,20,25,30]
function add5(arr){
const result=[]
numbers.forEach(ele => {
    result.push(ele+5)
});
return result
}
console.log(add5([10,15,20,25,30]))