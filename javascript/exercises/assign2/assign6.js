function longBurp(n){
let str='Burp'
    return str.slice(0,2)+(str.charAt(2).repeat(n)+str.charAt(3))
}
console.log(longBurp(3))
console.log(longBurp(5))

