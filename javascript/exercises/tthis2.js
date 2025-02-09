function User(uEmail,uPassword){

    this.email=uEmail
    this.password=uPassword
}
User.prototype.register=function(){}
User.prototype.login=function(){}
User.prototype.logout=function(){}
const u1=new User('agmail.com','secret123')
const u2=new User('bgmail.com','password')
console.log('user1',u1)
u1.register()
console.log(u1.hasOwnProperty('email'))
