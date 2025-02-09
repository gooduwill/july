function intOrString(str){
  if(typeof str=='string'){
    return `'str'`
  }
  else{
    return `'int'`
  }

}
console.log(intOrString('Hello'))
console.log(intOrString(8))