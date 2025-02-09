const str='JaVaSCriPT'
const alphabet={
    small:[],
    capital:[]
}
for(let char of str){
if(char==char.toUpperCase()){
    alphabet.capital.push(char)
}
else{
    alphabet.small.push(char)
}

}
console.log(alphabet)