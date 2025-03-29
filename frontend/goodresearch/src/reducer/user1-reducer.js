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