
/**
 * user2Reducer - A reducer function for managing user-related state.
 * 
 * This reducer handles state updates related to users, such as setting, adding,
 * removing, editing, and updating users in the state.
 * 
 * Actions:
 * - "set_user": Replaces the current user data with the provided payload.
 * - "add_user": Adds a new user to the existing list of users in the state.
 * - "remove_user": Removes a user from the state based on the provided ID.
 * - "set_edit_id": Sets the ID of the user being edited in the state.
 * - "update_user": Updates a user's data in the state and resets the edit ID after the update.
 * - Default: Returns the current state unchanged if the action type is not recognized.
 * 
 * Arguments:
 * - state: The current state, which includes a list of users (`data`) and the currently edited user ID (`editId`).
 * - action: The action object containing a `type` (the action type) and `payload` (the data to update the state).
 * 
 * Returns:
 * - A new state object with updates based on the action type (setting, adding, removing, editing, or updating user data).
 */const user2Reducer = (state, action) => {
  switch (action.type) {
    case "set_user": {
      return { ...state, data: action.payload };
    }
    case "add_user": {
      return { ...state, data: [...state.data, action.payload] };
    }
    case "remove_user": {
      return {
        ...state,
        data: state.data.filter((ele) => ele._id !== action.payload),
      };
    }
    case "set_edit_id": {
      return { ...state, editId: action.payload };
    }
    case "update_user": {
      return {
        ...state,
        data: state.data.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
        editId: null, // its Clear editId after updating
      };
    }
    default: {
      return state;
    }
  }
};
export default user2Reducer;