function nameScore(name){
    const scores = {"A": 100, "B": 14, "C": 9, "D": 28, "E": 145, "F": 12, "G": 3,
        "H": 10, "I": 200, "J": 100, "K": 114, "L": 100, "M": 25,
        "N": 450, "O": 80, "P": 2, "Q": 12, "R": 400, "S": 113,
        "T": 405, "U": 11, "V": 10, "W": 10, "X": 3, "Y": 210, "Z": 23}
    /*
        score <= 60: "NOT TOO GOOD"

        61 >= score <= 300: "PRETTY GOOD"

        301 >= score <= 599: "VERY GOOD"

        score >= 600: "THE BEST"
    */

        let result=0
        for(let char of name){
            result=result+scores[char.toUpperCase()]
        }
        if(result>=600){
            return 'the best'
        }
        else if(result>=30 && result<=599)
        {
            return 'Very good'
        }
        else if(result>=61 && result<=300)
        {
            return 'pretty good'
        }
        else if(result<=60)
        {  
            return 'not too good'
        }

}
console.log(nameScore('YOU')) // very good
console.log(nameScore('Matt')) // the best
console.log(nameScore('GOODWILL')) // the best
scores.kg=123
console.log(scores)
