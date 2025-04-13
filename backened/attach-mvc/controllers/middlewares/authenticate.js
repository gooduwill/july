import jwt from 'jsonwebtoken';
/* its a middleware
1. Three parameters are used (req, res, next);
2. Write any code
3. We can end req, response cycle
4. we can modify request object
*/
/**
 * Middleware: authenticateUser
 * 
 * Purpose:
 * This middleware function is responsible for authenticating a user 
 * based on a JWT (JSON Web Token) provided in the request headers. 
 * It ensures that protected routes are only accessible to authenticated users.
 * 
 * Steps:
 * 1. Extracts the token from the `Authorization` header.
 *    - If no token is provided, it returns a 401 Unauthorized response.
 * 2. Strips the 'Bearer' prefix from the token.
 * 3. Verifies the token using the secret key from environment variables.
 *    - If the token is valid, the decoded user information (userId and role)
 *      is attached to `req.currentUser` for use in subsequent middleware or route handlers.
 *    - If the token is invalid or expired, returns a 401 response with the error message.
 * 
 * Usage:
 * This middleware is typically used to protect routes that require a valid, authenticated user session.
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