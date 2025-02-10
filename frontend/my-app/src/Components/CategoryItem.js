import axios from "axios";
import CategoryContext from "./contexts/CategoryContext";

import { useContext, useState } from "react";
export default function CategoryItem({ _id, name }) {
  const { handleRemoveCategory } = useContext(CategoryContext);
  const deleteCategory = () => {
    const userConfirm = window.confirm("are you sure");
    if (userConfirm) {
      axios
        .delete(`http://localhost:3012/categories/${_id}`)
        .then((response) => {
          const result = response.data;
          handleRemoveCategory(result._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <li>
      {" "}
      {name} <button onClick={deleteCategory}>remove</button>
    </li>
  );
}
