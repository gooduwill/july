import { useContext, usestate } from "react";
import ExpensesContext from "./contexts/ExpensesContext";


import ExpenseRow from "./ExpenseRow";
export default function ExpenseTable() {
  const { expenses } = useContext(ExpensesContext);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.data.map((ele) => {
            return <ExpenseRow key={ele._id} {...ele} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
