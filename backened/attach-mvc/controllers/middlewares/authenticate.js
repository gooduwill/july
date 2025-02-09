import jwt from 'jsonwebtoken';
const authenticateUser=(req,res,next)=>{
    let token=req.headers['authorization']
    if(!token){
        return res.status(401).json({errors:'token not provided'})


    }
    token=token.split(' ')[1]
    try{
        const tokenData=jwt.verify(token,process.env.JWT_SECRET)//tokenData has 
        console.log('tokenData', tokenData);
        req.currentUser={userId: tokenData.userId, role:tokenData.role}
        //1req.userId=tokenData.userId;
        ///2req.currentUser.userId=tokenData.userId;
        //1req.role=tokenData.role;

        ///2req.currentUser.role=tokenData.role;
        next();
    }
    catch(err){
        return res.status(401).json({errors:err.message})
    }


}
export default authenticateUser;