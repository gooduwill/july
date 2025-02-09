function getCase(str){
    let count=0,count1=0
    for(let i=0; i<str.length;i++){
        if(str[i].toLowerCase()==str[i]){
            count++
            if(count==str.length-1){
                return `'Lowercase'`
            }
        }
        else if(str[i].toUpperCase()==str[i] && count==0){
            count1++
            if(count1==str.length-1){
                return `'Uppercase'`
            }
        }
        else
        {           
            return `'mixed'`
        }
    }
}
console.log(getCase('whisper...'))
console.log(getCase('SHOUT!'))
console.log(getCase('shoUT!'))
