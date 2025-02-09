const str='dct'
let reverse=''
for(i=str.length-1;i>=0;i--){
 reverse=reverse+str[i]
}
console.log(reverse)

console.log(str.split('').reverse().join(''))