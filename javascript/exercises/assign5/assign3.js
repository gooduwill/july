function inBox(arr){
    for(let i=0;i<arr.length;i++){
        if(arr[i].includes('*')){
            return true
        }
       
    }
}
console.log(inBox(["###","#*#","###"]))