function countWords(str){
    const array=str.trim().split(/\s+/)
    return array.length
}


console.log(countWords('just an exmple here move along'))
console.log(countWords('This is a test'))

