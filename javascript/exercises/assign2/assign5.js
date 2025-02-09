function helloWorld(int){
if(int%3==0 && int%5!=0){
    return `'Hello'`
}
else if(int%5==0 && int%3!=0){
    return `'World'`
     
}
else if(int%3==0 && int%5==0){
    return `'Hello World'`
}

}
console.log(helloWorld(3))
console.log(helloWorld(5))
console.log(helloWorld(15))