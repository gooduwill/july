function reverse(str){
let result={}
for(let char of str){
    if(char===char.toUppercase()){
        result(char)=result(char).toLowerCase()}
        else{
            result(char)=result(char).toUppercase()
        }
}
return result



}
console.log(reverse('Happy Birthday'))