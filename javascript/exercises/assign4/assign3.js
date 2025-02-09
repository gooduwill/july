function totalVolume(...arr){
return arr.reduce((acc,cv)=>acc+cv.reduce((acc1,cv1)=>acc1*cv1,1),0)}
console.log(totalVolume([2,2,2],[2,1,1]))