const str='bangalore'
let r1 =''

for(let i=0;i<str.length;i++){
    if(str[i]=='a'){
        r1=r1+'@'
        }
        else{
            r1=r1+str[i]
        }
}
console.log(r1)