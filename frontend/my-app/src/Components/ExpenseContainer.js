import {useMemo} from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";
import { useContext, useState } from "react";
import ExpensesContext from "./contexts/ExpensesContext";

export default function ExpenseContainer() {
  const { expenses } = useContext(ExpensesContext);
  const expensesSum=useMemo(()=>{
   return expenses.data.reduce((acc,cv)=>{
    console.log('calculating');
    return acc+cv.amount;
   },0)
  }, [expenses.data])
  return (
    <div>
      <h2> Listing Expenses-{expenses.data.length}</h2>
      <ExpenseForm />
      <h2> Total-{expensesSum}</h2>
      
      <ExpenseTable />
    </div>
  );
}
