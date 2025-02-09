import jwt from 'jsonwebtoken'
const user={_id:'123',email:'user5@gmail.com',password:''}
const tokenData={userId:user.id}
const token=jwt.sign(tokenData,'dct@123',{expiresIn:'7d'})
console.log(token)