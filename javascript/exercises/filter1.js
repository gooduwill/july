function getStrongPasswords(arr){

const result=arr.filter(ele=>
    ele.length>5

)
return result


}
console.log(getStrongPasswords(['abc12','secret','secrect123','pass',]))