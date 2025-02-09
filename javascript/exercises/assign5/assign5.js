function equal(a,b,c){
    let count=1
    if(a==b){
       count++
    }
        else if(a==c){
            count++
        }
            else if(a=b=c){
             count=count+3
            }
                else{
                    count=0
                }
                return count

    }
console.log(equal(3,4,3))