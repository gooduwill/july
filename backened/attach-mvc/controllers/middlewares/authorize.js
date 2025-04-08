const authorizeUser=(permittedRoles)=>{//permittedRoles is given  in url
    return (req,res,next)=>{
        if(permittedRoles.includes(req.currentUser.role)){//if roles matches execute next middleware function or return unauthorized
            next();
        }else{
            res.status(403).json({errors:'unauthorized access'})
        }
    }

}
export default authorizeUser;