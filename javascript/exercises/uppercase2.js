const str='JaVaSCriPt'
let capital='',small=''
for(let i=0;i<str.length;i++){
    if(str[i].charCodeAt()>=65 && str[i].charCodeAt()<=90){
        capital=capital+str[i]
    } else{
        small=small+str[i]
    }
}
console.log(capital+small)
