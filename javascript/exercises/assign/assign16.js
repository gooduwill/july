function frontThree(str){
if(str.length<3){
    return str
}else{
    return str.slice(0,3).repeat(3)
}

}
console.log(frontThree('Python'))
console.log(frontThree('Cucumber'))
