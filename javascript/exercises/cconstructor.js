function Customer(cName,cAccNo,cBalance,cMobile){

    this.name=cName
    this.accno=cAccNo
    this.balance=cBalance
    this.mobile=cMobile
}
Customer.prototype.currentBalance=function(){
    return `balance as on ${new Date} is ${this.balance}`
}
const c1=new Customer('jack','SBI123',1000,'9457663322')
console.log(c1)
console.log(c1.currentBalance())