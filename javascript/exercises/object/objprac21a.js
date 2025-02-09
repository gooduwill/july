function repeated(arr){
    const freq={}
    const result=[]
    arr.forEach(ele => {
        if(!(ele in freq)){
            freq[ele]=1

        }
                

        
    });
     /*for(let key in freq){
        if(freq[key]>1){
            result.push(key)
        }*/
     
     return freq
}
console.log(repeated(['a','b','a','b','c']))