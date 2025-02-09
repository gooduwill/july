const obj={
    a:10,
    b:20,
    c:30
}

function calcSum(){
    let sum=0
    for(let key in obj){
    //for(let key in obj){
       // let sum=0
        //sum=sum+obj[key]}
       // return sum
       sum=sum+obj[key]}
       return sum
}
console.log(calcSum(obj))