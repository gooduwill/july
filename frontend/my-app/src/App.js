//import "./Components/styles.css";
import axios from "axios";
import { useState, useReducer, useEffect } from "react";
import CategoryContainer from "./Components/CategoryContainer";
import ExpenseContainer from "./Components/ExpenseContainer";
import CategoryContext from "./Components/contexts/CategoryContext";
import ExpensesContext from "./Components/contexts/ExpensesContext";
const expenseInitialState = {
  data: [],
  editId: null,
  serverErrors: null,
};
const expensesReducer = (state, action) => {
  switch (action.type) {
    case "set_expenses": {
      return { ...state, data: action.payload };
    }
    case "add_expense": {
      return { ...state, data: [...state.data, action.payload] };
    }
    case "remove_expense": {
      return {...state, data: state.data.filter((ele)=>ele._id != action.payload)};
    }
    case "assign_edit_id":{
      return {...state, editId:action.payload};
    }
    case "update_expense":{
      return {...state, editId: null, data:state.data.map((ele)=>{
    if(ele._id==action.payload._id){
      return action.payload;
    } else{
      return ele;
      }
      })}
    }
    default: {
      return { ...state };
    }
  }
};
function App() {
  const [categories, setCategories] = useState([]);
  const [expenses, expensesDispatch] = useReducer(
    expensesReducer,
    expenseInitialState
  );
  useEffect(()=>{
    axios
    .get("http://localhost:3012/categories")
    .then((response) => {
      console.log(response.data);
      const result = response.data;
      setCategories(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
    
  },[])
  useEffect(()=>{
    axios
    .get("http://localhost:3012/expenses")
    .then((response) => {
      const result = response.data;
      expensesDispatch({ type: "set_expenses", payload: result });
    })
    .catch((err) => {
      console.log(err.message);
    });
  },[])

    const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
  };
  const handleRemoveCategory = (id) => {
    const newArray = categories.filter((ele) => ele._id != id);
    setCategories(newArray);
  };
 return (
    <div className="App">
      <h1> Expense App</h1>
           

       <CategoryContext.Provider value={{categories, handleAddCategory, handleRemoveCategory}}>
              <CategoryContainer/>
        </CategoryContext.Provider>
       
      <ExpensesContext.Provider value={{expenses, categories, expensesDispatch}}>
      <ExpenseContainer/>

      </ExpensesContext.Provider>
      
      <hr />
    </div>
  );
}
export default App;
