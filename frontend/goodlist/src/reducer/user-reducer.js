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
