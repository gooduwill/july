function reverse(str){
    const result={}
    for(let char of str){
        if(char==char.toUpperCase()){
            result[char]=char.toLowerCase()}
            else{
                result[char]=char.toUpperCase()
            }
    }
    return result
    
    
    
    }
    console.log(reverse('Happy Birthday'))