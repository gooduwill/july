function forbiddenLetter(char,arr){

    for(let i=0;i<arr.length;i++){
        for(let j=0;j<arr[i].length;j++){
            if(char==arr[i][j]){
                return false
            }
        
        else {
           }   return true
        }
    }
}
console.log(forbiddenLetter('r',['rock','paper','scissors']))
console.log(forbiddenLetter('a',['spoon','fork','knife']))