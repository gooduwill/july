const numbers=[10,'one',20,'two']
const result=[]
for(let i=0;i<numbers.length;i++){
    if(typeof numbers[i]=='string'){
        result.push(numbers[i])
    }
}
console.log(result)