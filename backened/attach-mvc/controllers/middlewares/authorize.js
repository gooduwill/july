const authorizeUser=(permittedRoles)=>{
    return (req,res,next)=>{
        if(permittedRoles.includes(req.currentUser.role)){
            next();
        }else{
            res.status(403).json({errors:'unauthorized access'})
        }
    }

}
export default authorizeUser;