/**
 * userReducer1 - A reducer function for managing professor-related state.
 * 
 * This reducer handles state updates related to professors, such as setting, adding,
 * removing, editing, and updating professors in the state.
 * 
 * Actions:
 * - "set_prof": Replaces the current professor data with the provided payload.
 * - "add_prof": Adds a new professor to the existing list of professors in the state.
 * - "remove_prof": Removes a professor from the state based on the provided ID.
 * - "prof_edit_id": Sets the ID of the professor being edited in the state.
 * - "update_prof": Updates a professor's data in the state and resets the edit ID after the update.
 * - Default: Returns the current state unchanged if the action type is not recognized.
 * 
 * Arguments:
 * - state: The current state, which includes a list of professors (`data`) and the currently edited professor ID (`peditId`).
 * - action: The action object containing a `type` (the action type) and `payload` (the data to update the state).
 * 
 * Returns:
 * - A new state object with updates based on the action type (setting, adding, removing, editing, or updating professor data).
 */
const userReducer1 = (state, action) => {
  switch (action.type) {
    case "set_prof": {
      return { ...state, data: action.payload };
    }
    case "add_prof": {
      return { ...state, data: [...state.data, action.payload] };
    }
    case "remove_prof": {
      return {
        ...state,
        data: state.data.filter((ele) => ele._id !== action.payload),
      };
    }
    case "prof_edit_id": {
      return { ...state, peditId: action.payload };
    }
    case "update_prof": {
      return {
        ...state,
        peditId: null, // Reset edit ID after update
        data: state.data.map((ele) => {
          if (ele._id === action.payload._id) {
            return action.payload;
          } else {
            return ele;
          }
        }),
      };
    }
    default: {
      return { ...state };
    }
  }
};
export default userReducer1;