function repeatString(str,n){
    if(typeof str=='string'){
        return str.repeat(n)
    }
    else{
        return 'not a string!!'
    }
}
console.log(repeatString('Alex',2))
console.log(repeatString(1990,2))