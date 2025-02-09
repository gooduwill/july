function moodToday(str){
if(str!=undefined){
    return `Today, i am feeling ${str}`
}
else{
    return `Today, i am feeling neutral`
}
}
console.log(moodToday('happy'))
console.log(moodToday( ))