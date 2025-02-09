let numbers=[10,11,12,13,14]
let separateNumbers={
    even:[],
    odd:[]
}
numbers.forEach((ele)=>{
    if(ele%2==0){
        separateNumbers.even.push(ele)
    }
    else{
        separateNumbers.odd.push(ele)
    }
})
console.log(separateNumbers)