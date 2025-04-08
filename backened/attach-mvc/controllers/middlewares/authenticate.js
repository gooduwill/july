import jwt from 'jsonwebtoken';
/* its a middleware
1. Three parameters are used (req, res, next);
2. Write any code
3. We can end req, response cycle
4. we can modify request object
*/

const authenticateUser=(req,res,next)=>{
    let token=req.headers['authorization']// token extraction when user send it
    if(!token){
        return res.status(401).json({errors:'token not provided'})


    }
    token=token.split(' ')[1]// removes bearer
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)//tokenData has verified using secret key
        console.log('tokenData', tokenData);
        req.currentUser={userId: tokenData.userId, role:tokenData.role}// we store token data in req.currentUser
        next();
    }
    catch(err){
        return res.status(401).json({errors:err.message})
    }


}
export default authenticateUser;