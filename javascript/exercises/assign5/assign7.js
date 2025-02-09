function hackerSpeak(str) {
    let result
    for (let i = 0; i < str.length; i++) {
        if (str[i] == 'a') {
            result = result + 4
        }
        else if (str[i] == 'e') {
            result = result + 3
        }
        else if (str[i] == 'i') {
            result = result + 1
        }
        else if (str[i] == 'o') {
            result = result + 0
        }
        else if (str[i] == 's') {
            result = result + 5
        }
        else {
            result = result + str[i]
        }
    }
    return result
}
console.log(hackerSpeak("javaascript is cool"))