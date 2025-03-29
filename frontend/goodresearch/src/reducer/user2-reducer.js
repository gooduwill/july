const user2Reducer = (state, action) => {
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