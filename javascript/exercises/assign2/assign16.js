function getExtension(arr){
let extension=''
for(let i=0;i<arr.length;i++){
    extension= extension+(arr[i].split('.').pop())
}
return extension

}
console.log(getExtension(['code.html','code.css']))