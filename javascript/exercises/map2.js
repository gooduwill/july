const transform=(arr)=>{

 const result=arr.map((ele)=>{
    if(ele%2==0){
        return ele+2
    }
    else{
        return ele+3
    }




 })
 return result
 




}
console.log(transform([10,11,12,13]))