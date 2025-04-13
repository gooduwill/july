/**
 * userReducer - A reducer function for managing user authentication state.
 * 
 * This reducer handles state updates related to user login and logout actions.
 * It updates the user state based on the provided action type and payload.
 * 
 * Actions:
 * - "LOGIN": Updates the state with the provided payload (user data) on a successful login.
 * - "LOGOUT": Resets the state to the provided payload (typically an empty state) on logout.
 * - Default: Returns the current state unchanged if the action type is not recognized.
 * 
 * Arguments:
 * - state: The current state of the user (typically contains user data like email, role, etc.).
 * - action: The action object containing a `type` and `payload`. The `payload` contains the data to be merged with the state.
 * 
 * Returns:
 * - A new state object with updates based on the action type (either login, logout, or no change).
 */
const userReducer=(state, action)=>{
    switch(action.type){
        case "LOGIN":{
            return {...state, ...action.payload}
        }
        case "LOGOUT":{
            return {...action.payload}
        }
        default:{
            return {...state}
        }
    }
 }
 export default userReducer;
