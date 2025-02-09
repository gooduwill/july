const charReplace=function(str,char){
    let result=''
    for(let i of str){
        if(i==char){
            result=result+'@'
        }
        else{
            result=result+i
        }
    }
    console.log(result)
    console.log(typeof(charReplace))
}
console.log(charReplace('bangalore','a'))