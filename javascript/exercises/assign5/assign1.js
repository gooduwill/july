function mean(num){
    let a=num.toString().split('')
    let result=0
    let a1
    for(let i=0;i<a.length;i++){
        a1=a.length
        result=result+parseInt(a[i])
    }
    return (result)/a1
}
console.log(mean(42))