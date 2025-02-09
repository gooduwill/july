const str='JaVaSCriPt'
let capital='',small=''
for(let i=0;i<str.length;i++){
    if(str[i]==str[i].toLocaleUpperCase()){
        capital=capital+str[i]
    } else{
        small=small+str[i]
    }
}
console.log(capital+small)
