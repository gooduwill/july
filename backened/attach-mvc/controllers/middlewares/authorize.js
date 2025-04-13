/**
 * Middleware Factory: authorizeUser
 * 
 * Purpose:
 * This is a higher-order middleware function used for **Role-Based Access Control (RBAC)**. 
 * It checks whether the authenticated user's role is permitted to access a specific route.
 * 
 * Parameters:
 * - permittedRoles (Array): A list of roles (e.g., ['admin', 'professor']) that are allowed to access the route.
 * 
 * How it Works:
 * - Returns a middleware function that:
 *   1. Checks if the role from `req.currentUser.role` (set by authenticateUser middleware) 
 *      is included in the `permittedRoles` list.
 *   2. If the role is permitted, it calls `next()` to proceed to the next middleware or route handler.
 *   3. If not, it responds with a 403 Forbidden status and an error message indicating unauthorized access.
 * */
 
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