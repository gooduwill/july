function rev(n){
    let m=n.toString()
    return Number(m.split('').reverse().join(''))
}
console.log(rev(5121))