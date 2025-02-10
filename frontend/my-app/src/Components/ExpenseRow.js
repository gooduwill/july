import axios from "axios";
import ExpensesContext from "./contexts/ExpensesContext";


import { useState, useReducer, useContext } from "react";
export default function ExpenseRow({
  expenseDate,
  title,
  amount,
  category,
  _id,
}) {
  const { expensesDispatch } = useContext(ExpensesContext);
  const handleRemove = () => {
    const userConfirm = window.confirm("are you sure");
    if (userConfirm) {
      axios
        .delete(`http://localhost:3012/expenses/${_id}`)
        .then((response) => {
          const result = response.data;
          expensesDispatch({ type: "remove_expense", payload: result._id });
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }
   const handleAssignEditId=()=>{
    expensesDispatch({type:'assign_edit_id', payload: _id})
  
   }
  return (
    <tr>
      <td>{expenseDate}</td>
      <td>{title}</td>
      <td>{amount}</td>
      <td>{category}</td>
      <td>
        <button onClick={handleAssignEditId}> Edit</button>
        <button onClick={handleRemove}>remove</button>
      </td>
    </tr>
  );
}
