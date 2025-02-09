function modifyLast(str,n){
return (str.slice(0,str.length-1).concat(str.charAt(str.length-1).repeat(n)))

}
console.log(modifyLast('Hello',3))
console.log(modifyLast('Hey',6))

