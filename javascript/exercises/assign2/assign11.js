function uploadCount(arr,str){
let count=0
for(let i=0;i<arr.length;i++){
    if(str==arr[i].slice(0,str.length)){
        count++
        
    }
}

return count

}
console.log(uploadCount(['sept 22','sept 21','oct 15'],'sept'))
console.log(uploadCount(['sept 22','sept 21','oct 15'],'oct'))