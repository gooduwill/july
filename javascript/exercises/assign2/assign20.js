function sameCase(str){
    let count=0,count1=0,count2=0
    for(let i=0; i<str.length;i++){
        
         if(str[i].toLowerCase()===str[i]){
            count++
            if(count==str.length-1){
                return true
            }
        }
        else if(str[i].toUpperCase()===str[i] && count==0 ){
            count1++
            if(count1==str.length-1){
                return true
            }
        }
       
            else{    return false
             }
    
}  
}
console.log(sameCase('hello'))
console.log(sameCase('HELLO'))
console.log(sameCase('helLO'))
console.log(sameCase('HelLO'))


