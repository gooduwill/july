function getStrings(arr){
    const result=arr.filter(ele=>
      typeof ele=='string' )


return result
    }
    console.log(getStrings(['dct',123,['ab'],true,'blore']))