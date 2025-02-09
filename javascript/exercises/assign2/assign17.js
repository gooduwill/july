function googlify(n){
const str='Google'
if(n>0){
return str.charAt(0)+str.charAt(1).repeat(n)+str.slice(3,5)
}
else{
    return 'Invalid'
}
}

console.log(googlify(10))