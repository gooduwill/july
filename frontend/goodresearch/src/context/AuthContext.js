
/**
 * Creates and exports an authentication context for managing user authentication state.
 *
 * This context is used to provide authentication-related data and functions 
 * throughout the application using React's Context API.
 * 
 */

import { createContext } from "react";
const AuthContext=createContext();
export default AuthContext;