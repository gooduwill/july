function rev(n){
    let m=n.toString()
     let k=(m.split('').reverse().join('')).concat(n)
     return Number(k)
}
console.log(rev(5121))