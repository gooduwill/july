function toObject(arr){

const result=arr.map((ele)=>{
   return {[ele]:ele.charCodeAt()}

})
return result


}
console.log(toObject(['a','b','c']))